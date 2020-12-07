
import axios from 'axios';
import { setHours } from 'date-fns';
import addDays from 'date-fns/addDays';
import {
  graphql,
  useStaticQuery,
} from 'gatsby';
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

import { IHoliday } from '../components/admin/Availability';
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Cart from '../components/Cart';
import CartContent, { getCartTotal } from '../components/CartContent';
import Calendar, { ITimes } from '../components/checkout/Calendar';
import CheckoutForm from '../components/checkout/CheckoutForm';
import AvailableDaysInfo from '../components/checkout/delivery/AvailableDaysInfo';
import Delivery from '../components/checkout/delivery/Delivery';
import DeliveryMap from '../components/checkout/delivery/DeliveryMap';
import DeliveryOptions from '../components/checkout/DeliveryOption';
import DeliverySummary from '../components/checkout/DeliverySummary';
import EmptyCart from '../components/checkout/EmptyCart';
import {
  IPickupLocation,
  pickupLocations,
} from '../components/checkout/pickupLocations';
import { possiblePickupDates } from '../components/checkout/possiblePickupDates';
import StageNavigation from '../components/checkout/StageNavigation';
import Error from '../components/Error';
import Fieldset from '../components/Fieldset';
import FormFooter from '../components/FormFooter';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';
import TextArea from '../components/TextArea';
import {
  ICartContext,
  store,
} from '../context/cartContext';
import { useFormWizard } from '../hooks/formWizard';
import { useForm } from '../hooks/useForm';

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
  pickupLocation: IPickupLocation;
  possibleDates: Date[];
  street: string;
  city: string;
  postcode: string;
  total: string;
  order: string;
  order_date: string | Date;
  order_time: any;
}

export interface ICheckoutConfig {
  deliveryFreeFrom: number;
  pickupLocations: IPickupLocation[];
}

export const checkoutConfig: ICheckoutConfig = {
  deliveryFreeFrom: 1400000000,
  pickupLocations: pickupLocations,
};

const stages = [
  'details',
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

const CartWrapper = styled.div`
  max-width: 30rem;
  @media (min-width: 640px){
  padding-left: 5rem;
  }
`;

const GET_HOLIDAYS = graphql`{
  allFaunaHoliday {
    nodes {
      id
      start
      end
    }
  }
}`;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayToNumber = (d: string) => {
  switch (d) {
    case 'Sunday':
      return 0;
    case 'Monday':
      return 1;
    case 'Tuesday':
      return 2;
    case 'Wednesday':
      return 3;
    case 'Thursday':
      return 4;
    case 'Friday':
      return 5;
    default:
    case 'Saturday':
      return 6;
  }
}

const Checkout: FC = () => {
  const { state } = useContext<ICartContext>(store);

  const [loading, setLoading] = useState(false);
  const [intentError, setIntentError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { allFaunaHoliday } = useStaticQuery<{ allFaunaHoliday: { nodes: IHoliday[] } }>(GET_HOLIDAYS);

  const holidays: IHoliday[] = allFaunaHoliday.nodes.map((n) => ({ start: new Date(n.start), end: setHours(new Date(n.end), 24) }))

  const defaultPickupDates = possiblePickupDates({ location: checkoutConfig.pickupLocations[0], holidays })
  const defaultValues = typeof window !== 'undefined' && sessionStorage.getItem('form-order')
    ? JSON.parse(sessionStorage.getItem('form-order'))
    : {
      delivery: 'pickup',
      order_time: { hour: 13, minute: 0 },
      order_date: defaultPickupDates.length > 0 ? defaultPickupDates[0] : null,
      possibleDates: defaultPickupDates,
      pickupLocation: checkoutConfig.pickupLocations[0],
    };

  const { errors, values, handleInputChange, handleInputChanges, handleSubmit, formatError, validateSome } = useForm<IOrder>({
    id: 'order',
    contract,
    defaultValues,
  });

  const availableDays = new Set(values.pickupLocation.daytimes.map((d) => d.day));
  const disabledDaysOfWeek = availableDays.size > 0 ? days.filter((day) => !availableDays.has(day)) : ['Sunday'];

  const { stage, maxVisitedStage, changeStage } = useFormWizard({ stages });
  const discountedTotal = getCartTotal(state.items);

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Layout>
      <Card className="main-content" style={{ minWidth: '75%' }}>
        <CardBody>
          <Stack>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '50rem', margin: 'auto' }}>
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
                            type="tel"
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
                      {
                        intentError !== '' && <Alert color="danger">Sorry we're having some trouble with our payment gateway.
                      <br />Please contact us on  07904 139992 to fullfil your order
                     <br /> <small>{intentError}</small></Alert>
                      }
                      <FormFooter>
                        <Button
                          type="button"
                          disabled={loading}
                          onClick={async () => {
                            let res: any;
                            try {
                              setLoading(true);
                              setIntentError('');
                              await validateSome(['name', 'email', 'tel']);
                              res = await axios.post("/.netlify/functions/paymentProcess", {
                                amount: discountedTotal * 100,
                                email: values.email,
                                order: state.items.map((item) => `${item.quantity} x  ${item.product.name}: ${item.sku.name}`),
                              });
                              if (res.data.statusCode !== 200) {
                                setIntentError(res.data.message);
                              } else {
                                setClientSecret(res.data.client_secret);
                                changeStage('deliveryChoice');
                              }
                            } catch (e) {
                              console.log('ERROR', e, res);
                            }
                            finally {
                              setLoading(false);
                            }
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
                        {/* <legend>Delivery / Pickup</legend> */}
                        <p>Choose whether you want your order delivered</p>
                        <DeliveryOptions
                          selected={values.delivery}
                          total={discountedTotal}
                          checkoutConfig={checkoutConfig}
                          showDisabled={false}
                          toggle={(v) => {
                            handleInputChange('delivery', v);
                          }} />
                        <Label>
                          {values.delivery === 'pickup' ? 'Pick up location' : 'Our delivery area'}
                        </Label>
                        <Delivery
                          checkoutConfig={checkoutConfig}
                          onClick={(location) => {
                            const possibleDates = possiblePickupDates({ location, holidays });
                            handleInputChanges({
                              pickupLocation: location,
                              possibleDates,
                              order_date: possibleDates.length > 0 ? possibleDates[0] : null,
                            })
                          }}
                          values={values} />
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
                        {/* <legend>Delivery / Pickup</legend> */}
                        <div>
                          {
                            discountedTotal > checkoutConfig.deliveryFreeFrom && <>
                              {
                                values.delivery === 'delivery' &&
                                <Stack>
                                  <div>
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
                                  </div>
                                  <div>
                                    <DeliveryMap
                                      markers={[{
                                        position: { lat: 51.2550075, lng: -1.0959825 },
                                        showDeliveryArea: true,
                                      }]}
                                    />
                                  </div>
                                </Stack>
                              }
                            </>
                          }

                          <FormGroup>
                            <Label>
                              {
                                values.delivery === 'delivery'
                                  ? 'When would you like your order delivered?'
                                  : 'When would you like to pick up your order on?'
                              }
                            </Label>
                            <AvailableDaysInfo
                              delivery={values.delivery}
                              availableDays={availableDays}
                            />

                            <Calendar
                              disabledRanges={holidays.concat({ start: new Date(), end: addDays(new Date(), 1) })}

                              orderDate={typeof values.order_date === 'string'
                                ? new Date(values.order_date)
                                : values.order_date}
                              orderTime={values.order_time}
                              disabledDaysOfWeek={
                                (disabledDaysOfWeek).map((d) => dayToNumber(d))
                              }
                              handleInputChange={handleInputChange}
                              availability={locationToTimes(values.pickupLocation)}
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
            </div>
            {
              stage !== 'info' &&

              <CartWrapper>
                <Cart readonly />
              </CartWrapper>
            }
          </Stack>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Checkout;

const locationToTimes = (location: IPickupLocation) => {
  const times: ITimes[] = new Array(7).fill({
    startTime: { hour: 11, minute: 0 },
    endTime: { hour: 20, minute: 0 },
    deliveryAvailability: [{
      start: { hour: 0, minute: 0 },
      end: { hour: 0, minute: 0 },
    }]
  });
  location.daytimes.forEach((t) => {
    const i = dayToNumber(t.day);
    times[i] = {
      startTime: { hour: 11, minute: 0 },
      endTime: { hour: 20, minute: 0 },
      deliveryAvailability: [t.time]
    }
  })
  return times;
}
