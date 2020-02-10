
import 'react-day-picker/lib/style.css';

import { gql } from 'apollo-boost';
import React, {
  useContext,
  useState,
} from 'react';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';

import Button from '../components/Button';
import CardBody from '../components/CardBody';
import Calendar from '../components/checkout/Calendar';
import Fieldset from '../components/Fieldset';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/Layout';
import TextArea from '../components/TextArea';
import { store } from '../context/cartContext';

export interface IOrder {
  additional_info: string;
  name: string;
  email: string;
  delivery: 'pickup' | 'delivery';
  street: string;
  city: string;
  postcode: string;
  total: string;
  order: string;
  order_date: string | Date;
  order_time: any;

}

// function parseDate(str, format, locale) {
//   const parsed = dateFnsParse(str, 'dd-MM-yyyy', new Date(), { locale });
//   if (DateUtils.isDate(parsed)) {
//     return parsed;
//   }
//   return undefined;
// }

// function formatDate(date, format, locale) {
//   return dateFnsFormat(date, format, { locale });
// }

const CREATE_ORDER = gql`
mutation createOrder($order: createOrderInput!) {
  createOrder(input: $order) {
    order {
      id
    }
  }
}`;

export default () => {
  // const stripe = (window as any).Stripe('pk_test_bvHfxmEQzDAM98SrPyo1WfzG007Jp1mhLx');
  const [createOrder, { data }] = useMutation(CREATE_ORDER);
  const { state } = useContext(store);
  const [showAddress, setShowAddress] = useState(false);
  const { register, handleSubmit, watch, control, errors } = useForm<IOrder>()

  const total = state.items.reduce((prev, next) => prev + (next.price * next.quantity), 0);

  const deliveryHours = [12, 1, 2];

  const onSubmit = (formData: IOrder) => {

    try {
      if (formData.order_date && typeof formData.order_date !== 'string') {
        formData.order_date = formData.order_date.toISOString();
      }
      console.log('formdata', formData);
      createOrder({ variables: { order: { data: formData } } });

      // stripe.redirectToCheckout({
      //   items: [
      //     // Replace with the ID of your SKU
      //     { sku: 'prod_Gb4KIiP0VIBuhr', quantity: 1 }
      //   ],
      //   successUrl: 'https://example.com/success',
      //   cancelUrl: 'https://example.com/cancel',
      // }).then(function (result) {
      //   console.log(result);
      //   // If `redirectToCheckout` fails due to a browser or network
      //   // error, display the localized error message to your customer
      //   // using `result.error.message`.
      // });
    } catch (e) {
      console.log('error', e);
    }
  }
  return (
    <Layout>
      <CardBody>
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              name="name"
              ref={register} />
            {
              errors.name && <span>This field is required</span>
            }
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" ref={register} />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Calendar
              control={control} />

          </FormGroup>

          <FormGroup>
            <Label>Delivery</Label>
            <select ref={register}
              name="delivery"
              onChange={(e) => setShowAddress(e.target.selectedIndex === 1)}>

              <option value="pickup">Pick up</option>
              <option value="delivery">Delivery</option>
            </select>
          </FormGroup>
          {
            showAddress &&

            <Fieldset>
              <legend>Address</legend>
              <FormGroup>
                <Label>Street</Label>
                <Input name="address" ref={register} />
              </FormGroup>
              <FormGroup>
                <Label>City</Label>
                <Input name="city" ref={register} />
              </FormGroup>
              <FormGroup>
                <Label>Postcode</Label>
                <Input name="postcode" ref={register} />
              </FormGroup>
            </Fieldset>
          }
          <FormGroup>
            <Label>Additional info</Label>
            <TextArea name="additional_info" ref={register} />
          </FormGroup>
          <Input name="total" value={total} />
          <Input name="order" value={JSON.stringify(state.items)} />
          <Button type="submit">Submit</Button>
        </form>
      </CardBody>
    </Layout>
  );
}