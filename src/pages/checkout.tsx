
import axios from 'axios';
import addDays from 'date-fns/addDays';
import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  email,
  required,
  Validation,
} from 'validate-promise';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Cart, { getCartTotal } from '../components/Cart';
import CartContent from '../components/CartContent';
import Calendar from '../components/checkout/Calendar';
import CheckoutForm from '../components/checkout/CheckoutForm';
import DeliveryOptions, { deliveryFreeFrom } from '../components/checkout/DeliveryOption';
import DeliverySummary from '../components/checkout/DeliverySummary';
import EmptyCart from '../components/checkout/EmptyCart';
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
import { store } from '../context/cartContext';
import { useFormWizard } from '../hooks/formWizard';
import { useDiscount } from '../hooks/useDiscount';
import { useForm } from '../hooks/useForm';
import { ThisLayout } from './index';

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 250px;
  grid-gap: 32px;
}
`;

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


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface ICol {
  xs?: number;
}
const Col = styled.div<ICol>`
  margin: 0 0.125rem;
  flex-grow: 1;
  ${(props) => {
    if (props.xs) {
      return `
      width: ${(props.xs / 12) * 100}%;
      `;
    }
    return `
    @media (min-width: 640px){
      flex-grow: 1;
    }
    `;
  }}
`;

const stages = ['details',
  'deliveryChoice',
  'deliveryOptions',
  'info',
]

const contract: Array<Validation<IOrder>> = [
  {
    key: 'name',
    promises: [
      { rule: required, msg: () => 'Name is required' },
    ]
  },
  {
    key: 'email',
    promises: [
      { rule: email, msg: () => 'Email is required and should be a valid email address' },
    ]
  },
  {
    key: 'tel',
    promises: [
      { rule: required, msg: () => 'Tel is required' }
    ]
  }
];

const pk = process.env.NODE_ENV === 'development'
  ? process.env.STRIPE_PUBLISHABLE_KEY_TEST
  : process.env.STRIPE_PUBLISHABLE_KEY ?? 'pk_live_NpIzgQMQCs9C4vDbqG5WHk7v00dThpwTXu';

const stripePromise = loadStripe(pk);

const applyDiscount = (value: number, discount: number) => {
  return discount === 0
    ? value
    : value - (value * (discount / 100));
}
const Checkout: FC = () => {
  const { state, dispatch } = useContext(store);
  const [discount, setDiscount] = useState(0);
  const { value } = useDiscount(setDiscount);
  const total = getCartTotal();
  const [clientSecret, setClientSecret] = useState('');
  const discountedTotal = applyDiscount(total, discount);

  const defaultValues = typeof window !== 'undefined' && sessionStorage.getItem('form-order')
    ? JSON.parse(sessionStorage.getItem('form-order'))
    : {
      delivery: 'pickup',
      order_date: addDays(new Date(), 1),
      order_time: { hour: 13, minute: 0 },
    };
  const { errors, values, handleInputChange, handleSubmit, formatError, validateTouched, validateSome } = useForm<IOrder>({
    id: 'order',
    contract,
    defaultValues,
  });

  const { stage, maxVisitedStage, changeStage } = useFormWizard({ stages });

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Layout>
      <ThisLayout>
        <Card className="main-content">
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '50rem', margin: 'auto' }}>
              <h1 style={{ padding: 0, margin: 0 }}>Checkout</h1>
              <StageNavigation
                stages={stages}
                active={stage}
                maxVisitedStage={maxVisitedStage}
                setStage={changeStage} />
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '50rem', margin: 'auto' }}>
              <div>
                {
                  stage === 'details' &&
                  <>
                    <Fieldset>
                      <legend>
                        Your contact details
                    </legend>
                      <FormGroup>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          autoComplete="name"
                          id="name"
                          name="name"
                          defaultValue={values.name}
                          valid={!errors.hasOwnProperty('name')}
                          onBlur={(e) => handleInputChange('name', e.target.value)}
                        />
                        {
                          errors.name && <Error>{formatError(errors.name)}</Error>
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="id">Email * </Label>
                        <Input name="email"
                          id="email"
                          type="email"
                          defaultValue={values.email}
                          autoComplete="email"
                          valid={!errors.hasOwnProperty('email')}
                          onBlur={(e) => handleInputChange('email', e.target.value)}
                        />
                        {
                          errors.email && <Error>{formatError(errors.email)}</Error>
                        }
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="tel">Telephone * </Label>
                        <Input name="tel"
                          id="tel"
                          defaultValue={values.tel}
                          autoComplete="tel"
                          valid={!errors.hasOwnProperty('tel')}
                          onBlur={(e) => handleInputChange('tel', e.target.value)}
                        />
                        <div>
                          <small>We only use this if we have to contact you regarding your order.</small>
                        </div>
                      </FormGroup>
                      {
                        errors.tel && <Error>{formatError(errors.tel)}</Error>
                      }
                    </Fieldset>
                    <FormFooter>
                      <Button
                        type="button"
                        onClick={async () => {
                          try {
                            await validateSome(['name', 'email', 'tel']);
                            const res = await axios.post("/.netlify/functions/paymentProcess", {
                              amount: discountedTotal * 100,
                              email: values.email,
                              order: state.items.map((item) => `${item.quantity} x  ${item.product.name}: ${item.skus[item.selectedSKUIndex].name}`),
                            });
                            setClientSecret(res.data.client_secret);
                            changeStage('deliveryChoice');
                          } catch (e) { }
                        }}
                        color="primary"
                      >Continue</Button>
                    </FormFooter>
                  </>
                }
                {
                  stage === 'deliveryChoice' &&
                  <>
                    <Fieldset>
                      <legend>Delivery / Pickup</legend>
                      <p>Choose whether you want your order delivered</p>
                      <DeliveryOptions
                        selected={values.delivery}
                        total={total}
                        toggle={(v) => {
                          handleInputChange('delivery', v);
                        }} />
                      <Row>
                        <Col xs={12}>

                          <Label>
                            {values.delivery === 'pickup' ? 'Pick up location' : 'Our delivery area'}
                          </Label>
                          <Row>
                            {
                              values.delivery === 'pickup' &&
                              <Col xs={12}>
                                <strong>Pick up from: </strong>
                                <div className="adr">
                                  <div className="street-address">35 Morley Road</div>
                                  <div className="locality">Basingstoke</div>
                                  <div className="region">Hampshire</div>
                                  <div className="postal-code">RG21 3LH</div>
                                </div>
                              </Col>
                            }
                            <Col xs={12}>
                              <DeliveryMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjdFEZgu3s8slEPabzamBDEjIP6pU1OSU&libraries=places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `300px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                showDeliveryArea={values.delivery === 'delivery'} />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Fieldset>

                    <FormFooter>
                      <Button
                        type="button"
                        onClick={() => changeStage('deliveryOptions')}
                        color="primary"
                      >Continue
                      </Button>
                    </FormFooter>
                  </>
                }

                {
                  stage == 'deliveryOptions' &&
                  <>
                    <Fieldset>
                      <legend>Delivery / Pickup</legend>
                      <div>
                        {
                          total > deliveryFreeFrom && <>
                            {
                              values.delivery === 'delivery' &&
                              <>
                                <Row>
                                  <Col xs={12}>
                                    <p>Delivery address details:</p>
                                    <FormGroup>
                                      <Label htmlFor="address1">Address</Label>
                                      <Input name="address1"
                                        id="address1"
                                        onBlur={(e) => handleInputChange('street', e.target.value)}
                                        autoComplete="street-address address-line1" />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label htmlFor="town">Town</Label>
                                      <Input name="town"
                                        id="town"
                                        onBlur={(e) => handleInputChange('city', e.target.value)}
                                        autoComplete="street-address address-line2" />
                                    </FormGroup>

                                    <FormGroup>
                                      <Label htmlFor="postcode">Post code</Label>
                                      <Input name="postcode"
                                        id="postcode"
                                        onBlur={(e) => handleInputChange('postcode', e.target.value)}
                                        autoComplete="street-address postal-code" />
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <DeliveryMap
                                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjdFEZgu3s8slEPabzamBDEjIP6pU1OSU&libraries=places"
                                      loadingElement={<div style={{ height: `100%` }} />}
                                      containerElement={<div style={{ height: `300px` }} />}
                                      mapElement={<div style={{ height: `100%` }} />}
                                      showDeliveryArea={values.delivery === 'delivery'} />
                                  </Col>
                                </Row>
                              </>
                            }
                          </>
                        }

                        <FormGroup>
                          <Label>
                            {
                              values.delivery === 'delivery'
                                ? 'When would you like your order delivered?'
                                : 'When would you like to pick up your order on?'
                            }</Label>
                          <Calendar
                            orderDate={typeof values.order_date === 'string' ? new Date(values.order_date) : values.order_date}
                            orderTime={values.order_time}
                            handleInputChange={handleInputChange}
                          />
                        </FormGroup>
                      </div>
                    </Fieldset>
                    <FormFooter>
                      <Button
                        type="button"
                        onClick={() => changeStage('info')}
                        color="primary"
                      >Continue
                      </Button>
                    </FormFooter>
                  </>
                }
                {stage === 'info' &&
                  <>
                    <Fieldset>
                      <Label text>Order summary</Label>
                      <CartContent
                        readonly
                        total={total}
                        discount={discount}
                        discountedTotal={discountedTotal}
                      />
                      <DeliverySummary order={values} />
                    </Fieldset>
                    <Fieldset>
                      <legend>Additional Info</legend>
                      <FormGroup>
                        <Label htmlFor="additional_info">
                          Let us know about any additional information regarding your order
                            </Label>
                        <TextArea name="additional_info"
                          id="additional_info"
                          onBlur={(e) => handleInputChange('additional_info', e.target.value)}
                          rows="3"
                        />
                      </FormGroup>
                    </Fieldset>
                    <Fieldset>
                      <legend>Pay with card</legend>

                      <Elements stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret}
                          discountedTotal={discountedTotal}
                          order={values} />
                      </Elements>
                    </Fieldset>
                  </>
                }
              </div>
            </form>
          </CardBody>
        </Card>
        <div id="cart">
          <Cart readonly />
        </div>
      </ThisLayout>
    </Layout >
  );
}

export default Checkout;
