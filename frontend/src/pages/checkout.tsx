
import { Link } from 'gatsby';
import React, {
  FC,
  useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import Cart from '../components/Cart';
import Calendar from '../components/checkout/Calendar';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/Layout';
import TextArea from '../components/TextArea';
import { store } from '../context/cartContext';
import { Frame } from './meals';

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


const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormFooter = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const Checkout: FC = () => {
  // const stripe = (window as any).Stripe('pk_test_bvHfxmEQzDAM98SrPyo1WfzG007Jp1mhLx');
  // const [createOrder] = useMutation(CREATE_ORDER);
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, watch, control, errors } = useForm<IOrder>()
  const deliveryHours = [12, 1, 2];


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
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit(redirectToCheckout)}>
              <Row>
                <div>
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
                    <Label htmlFor="tel">Telephone</Label>
                    <Input name="tel" ref={register} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Additional info</Label>
                    <TextArea name="additional_info" cols="50" rows="7" ref={register} />
                  </FormGroup>
                </div>
                <div>
                  <FormGroup>
                    <Label>Pick up date</Label>
                    <Calendar
                      control={control} />
                  </FormGroup>


                </div>
              </Row>

              <FormFooter>
                <Button
                  color="primary"
                  type="submit">Proceed to payment</Button>
              </FormFooter>
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