import axios from 'axios';
import { navigate } from 'gatsby';
import React, {
  FC,
  FormEvent,
  useContext,
  useState,
} from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import styled from 'styled-components';

import {
  CardElement,
  CardElementProps,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { store } from '../../context/cartContext';
import { formatter } from '../../lib/formatter';
import { IOrder } from '../../pages/checkout';
import Button from '../Button';
import Error from '../Error';
import FormFooter from '../FormFooter';
import FormGroup from '../FormGroup';
import { inputStyle } from '../Input';
import Label from '../Label';

const CARD_ELEMENT_OPTIONS: CardElementProps['options'] = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  iconStyle: 'solid',
  hidePostalCode: true,
};

interface IProps {
  clientSecret: string;
  onlyTickets: boolean;
  discountedTotal: number;
  order: IOrder;
}

const StripeForm = styled.form`
.StripeElement {
  height: 40px;
  
  width: 100%;
  color: hsl(164,11%,25%);
  background-color: white;
  border: 1px solid transparent;
  border-radius: 1px;
  ${(props) => inputStyle(props)};
  padding: 10px 12px;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  border: 1px solid ${(props) => props.theme.colors.blue500};
}

.StripeElement--invalid {
  border-color: ${(props) => props.theme.colors.red500};
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
`;

export interface IStoredOrder {
  amount: number;
  id?: string;
  ts?: number;
  error?: any;
  order: { product: string, price: string, quantity: number }[];
  customer: IOrder;
  status: string;
}

const CheckoutForm: FC<IProps> = ({
  clientSecret,
  discountedTotal,
  onlyTickets,
  order,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { state, dispatch } = useContext(store);

  const handleSubmit = async (event: FormEvent) => {
    setError('');
    setDisabled(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    event.stopPropagation();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const orderItem: IStoredOrder = {
      amount: discountedTotal,
      order: state.items.map((item) => {
        const sku = item.sku;
        return {
          product: item.product.name + ': ' + sku.name,
          price: String(sku.price),
          quantity: item.quantity,
        }
      }),
      customer: order,
      status: 'pending payment',
    };

    const response = await axios.post("/.netlify/functions/order-create", orderItem);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {

        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: order.name,
            email: order.email,
            address: {
              line1: order.street,
              city: order.city,
              postal_code: order.postcode,
            },
          },
        }
      });
      
      if (result.error) {
        setDisabled(false);

        // Show error to your customer (e.g., insufficient funds)
        setError(result.error.message);
        try {
          await axios.post("/.netlify/functions/sendmail", {
            subject: 'Banana Blossom: Order failed',
            error: result.error.message,
            ...order,
            order: state.items
          });
        } catch (e) {
          /// swallow
        }

        await axios.post("/.netlify/functions/order-update", {
          data: {
            ...orderItem,
            status: 'payment failed',
            error: result.error.message,
          },
          id: response.data.ref['@ref'].id,
        });
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
          try {
            await axios.post("/.netlify/functions/send-receipt.js", {
              ...order, 
              order: state.items,
              onlyTickets,
            })
          } catch (e) {
            // swallow...
          }
          try {
            await axios.post("/.netlify/functions/sendmail", {
              ...order, 
              order: state.items,
              onlyTickets,
            })
          } catch (e) {
            // swallow....
          }
          
          dispatch({ type: 'CART_CLEAR' });

          await axios.post("/.netlify/functions/order-update", {
            data: {
              ...orderItem,
              status: 'payment success',
            },
            id: response.data.ref['@ref'].id,
          });

          if (typeof window !== `undefined`) {
            navigate('/payment-success');
          }
        }
        setDisabled(false);
      }
    } catch (err) {
      console.log('error', err);
      setError(err.toString());
      setDisabled(false);
      await axios.post("/.netlify/functions/order-update", {
        data: {
          ...orderItem,
          status: 'payment failed',
          error: err.toString(),
        },
        id: response.data.ref['@ref'].id,
      });
    }

  };

  return (
    <StripeForm>
      <FormGroup>
        <Label>
          Card information
        </Label>
      </FormGroup>
      <CardElement options={CARD_ELEMENT_OPTIONS}
      />
      {
        error !== '' && <Error>{error}</Error>
      }
      <FormFooter>
        <Button
          onClick={async (e) => {
            await handleSubmit(e);
          }}
          disabled={disabled}
          color="primary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
        >
          <AiOutlineLock size={25} />
          <div>Pay {formatter.format(discountedTotal)}
          </div>
        </Button>
      </FormFooter>
    </StripeForm>
  );
}

export default CheckoutForm;
