
import axios from 'axios';
import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Cart from '../components/Cart';
import Calendar from '../components/checkout/Calendar';
import DeliveryAddress from '../components/checkout/DeliveryAddress';
import DeliveryOptions, { TDeliveryOptions } from '../components/checkout/DeliveryOption';
import StageNavigation from '../components/checkout/StageNavigation';
import DeliveryMap from '../components/DeliveryMap';
import Error from '../components/Error';
import Fieldset from '../components/Fieldset';
import FormFooter from '../components/FormFooter';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/layout';
import TextArea from '../components/TextArea';
import TimePicker from '../components/TimePicker';
import { store } from '../context/cartContext';
import { Frame } from './meals';

export interface IOrder {
  additional_info: string;
  name: string;
  email: string;
  tel: string;
  delivery: 'pickup' | 'delivery';
  street: string;
  city: string;
  postcode: string;
  total: string;
  order: string;
  order_date: string | Date;
  order_time: any;
}

const deliveryAvailability = [
  {
    start: { hour: 10, minute: 0 },
    end: { hour: 14, minute: 0, },
  },
  {
    start: { hour: 16, minute: 0 },
    end: { hour: 18, minute: 30, },
  },
];

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Col = styled.div`
  margin: 0 0.125rem;
  flex-grow: 1;
`;

export enum Stage {
  details,
  deliveryChoice,
  deliveryOptions,
  info,
};

const Checkout: FC = () => {
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, watch, control, errors, triggerValidation } = useForm<IOrder>();
  const total = state.items.reduce((total, item) => total + (item.quantity * item.price / 100), 0);
  const [stage, setStage] = useState<Stage>(Stage.details);
  const [maxVisitedStage, setMaxVisitedStage] = useState<Stage>(Stage.details);
  const changeStage = (stage: Stage) => {
    const stages = Object.values(Stage).filter((s) => typeof s === 'string');
    const activeIndex = stages.findIndex((s) => s === stage);
    if (stage > maxVisitedStage) {
      setMaxVisitedStage(stage);
    }
    setStage(stage);
  }
  const [delivery, setDelivery] = useState<TDeliveryOptions>('pickup');

  const redirectToCheckout = async (formData: IOrder) => {
    const stripe = (window as any).Stripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_live_NpIzgQMQCs9C4vDbqG5WHk7v00dThpwTXu', {
      betas: ['checkout_beta_4'],
    });

    const { error } = await stripe.redirectToCheckout({
      items: state.items.map((item) => ({ sku: item.skus[item.selectedSKUIndex].id, quantity: item.quantity })),
      customerEmail: formData.email,
      successUrl: `https://www.banana-blossom.kitchen/payment-success/`,
      cancelUrl: `https://www.banana-blossom.kitchen/payment-failure/`,
    })
    dispatch({ type: 'CART_CLEAR' });

    if (error) {
      console.error('Error:', error)
    }
  }

  if (state.items.length === 0) {
    return (
      <Layout>
        <Frame>
          <Card>
            <CardBody>
              <h1>Nothing to buy</h1>
              <Link to="meals">
                <Button>Order some
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Frame>
      </Layout>
    );
  }

  return (
    <Layout>
      <Frame>
        <Card>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>Checkout</h1>
              <StageNavigation
                active={stage}
                maxVisitedStage={maxVisitedStage}
                setStage={changeStage} />
            </div>
            <form onSubmit={handleSubmit(redirectToCheckout)}>
              <div>
                {
                  stage === Stage.details &&
                  <>
                    <Fieldset>
                      <legend>
                        Your contact details
                    </legend>
                      <FormGroup>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          autocomplete="name"
                          id="name"
                          name="name"
                          valid={!errors.name}
                          onBlur={() => triggerValidation('name')}
                          ref={register({ required: true })} />
                        {
                          errors.name && <Error>This field is required</Error>
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="id">Email * </Label>
                        <Input name="email"
                          id="email"
                          type="email"
                          autocomplete="email"
                          onBlur={() => triggerValidation('email')}
                          ref={register({ required: true })} />
                        {
                          errors.email && <Error>This field is required</Error>
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="tel">Telephone * </Label>
                        <Input name="tel"
                          id="tel"
                          autocomplete="tel"
                          onBlur={() => triggerValidation('tel')}
                          ref={register({ required: true })} />
                      </FormGroup>
                      {
                        errors.tel && <Error>This field is required</Error>
                      }
                    </Fieldset>
                    <FormFooter>
                      <Button
                        type="button"
                        onClick={() => changeStage(Stage.deliveryChoice)}
                        color="primary"
                      >Continue</Button>
                    </FormFooter>
                  </>
                }
                {
                  stage === Stage.deliveryChoice &&
                  <>
                    <Fieldset>
                      <legend>Delivery / Pickup</legend>
                      <p>Choose whether you want your order delivered</p>
                      <DeliveryOptions
                        selected={delivery}
                        toggle={setDelivery} />
                    </Fieldset>
                    <FormFooter>
                      <Button
                        type="button"
                        onClick={() => changeStage(Stage.deliveryOptions)}
                        color="primary"
                      >Continue
                      </Button>
                    </FormFooter>
                  </>
                }

                {
                  stage == Stage.deliveryOptions &&
                  <>
                    <Fieldset>
                      <legend>Delivery / Pickup</legend>
                      <div>
                        {
                          total > 25 && <>
                            {
                              delivery === 'delivery' &&
                              <>
                                <Row>
                                  <Col>
                                    <p>Delivery address details:</p>
                                    <FormGroup>
                                      <Label htmlFor="address1">Address</Label>
                                      <Input name="address1"
                                        id="address1"
                                        autocomplete="street-address address-line1" />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label htmlFor="town">Town</Label>
                                      <Input name="town"
                                        id="town"
                                        autocomplete="street-address address-line2" />
                                    </FormGroup>

                                    <FormGroup>
                                      <Label htmlFor="postcode">Post code</Label>
                                      <Input name="postcode"
                                        id="postcode"
                                        autocomplete="street-address postal-code" />
                                    </FormGroup>
                                  </Col>
                                  <Col>
                                    <DeliveryMap
                                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjdFEZgu3s8slEPabzamBDEjIP6pU1OSU&libraries=places"
                                      loadingElement={<div style={{ height: `100%` }} />}
                                      containerElement={<div style={{ height: `300px` }} />}
                                      mapElement={<div style={{ height: `100%` }} />} />
                                  </Col>
                                </Row>
                              </>
                            }
                          </>
                        }

                        <FormGroup>
                          <Label>
                            {
                              delivery === 'delivery'
                                ? 'What day would you like your order delivered?'
                                : 'What day would you like to pick up your order on?'
                            }</Label>
                          <Calendar
                            control={control} />
                          <TimePicker
                            startTime={{ hour: 9, minute: 0 }}
                            endTime={{ hour: 19, minute: 0 }}
                            available={deliveryAvailability} />
                        </FormGroup>


                      </div>
                    </Fieldset>
                    <FormFooter>
                      <Button
                        type="button"
                        onClick={() => changeStage(Stage.info)}
                        color="primary"
                      >Continue</Button>
                    </FormFooter>
                  </>
                }
                {stage === Stage.info &&
                  <>
                    <Fieldset>
                      <legend>Additional Info</legend>
                      <FormGroup>
                        <Label htmlFor="additional_info">
                          Please let us know about any additional information
                        </Label>
                        <TextArea name="additional_info"
                          id="additional_info"
                          cols="50"
                          rows="7"
                          ref={register} />
                      </FormGroup>
                    </Fieldset>
                    <FormFooter>
                      <Button
                        color="primary"
                        type="submit">Proceed to payment
                      </Button>
                    </FormFooter>
                  </>
                }

              </div>
            </form>
          </CardBody>
        </Card>
        <div>
          <Cart readonly />

        </div>
      </Frame>
    </Layout>
  );
}

export default Checkout;