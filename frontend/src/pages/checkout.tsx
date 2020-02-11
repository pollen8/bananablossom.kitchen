
import React, {
  FC,
  useContext,
  useState,
} from 'react';
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



const Checkout: FC = () => {
  // const stripe = (window as any).Stripe('pk_test_bvHfxmEQzDAM98SrPyo1WfzG007Jp1mhLx');
  // const [createOrder] = useMutation(CREATE_ORDER);
  const { state } = useContext(store);
  const [showAddress, setShowAddress] = useState(false);
  const { register, handleSubmit, watch, control, errors } = useForm<IOrder>()

  const total = state.items.reduce((prev, next) => prev + (next.price * next.quantity), 0);

  const deliveryHours = [12, 1, 2];


  console.log('state', state);

  const redirectToCheckout = async (formData: IOrder) => {
    // event.preventDefault()
    const stripe = (window as any).Stripe(process.env.STRIPE_PUBLISHABLE_KEY, {
      betas: ['checkout_beta_4'],
    })

    const { error } = await stripe.redirectToCheckout({
      items: state.items.map((item) => ({ sku: item.id, quantity: item.quantity })),
      customerEmail: formData.email,
      successUrl: `http://localhost:8000/page-2/`,
      cancelUrl: `http://localhost:8000/advanced/`,
    })

    if (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Layout>
      <CardBody>
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit(redirectToCheckout)}>
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

export default Checkout;