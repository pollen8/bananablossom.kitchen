import React from 'react';

import Button from '../components/Button';
import CardBody from '../components/CardBody';
import FormFooter from '../components/FormFooter';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/layout';
import Stack from '../components/layout/Stack';
import TextArea from '../components/TextArea';
import {
  Bg,
  InsetBox,
} from './';

export default () => <Layout>
  <Bg>
    <InsetBox>
      <h1>Contact us</h1>
      <Stack>
        <div>
          <form name="contact" data-netlify="true" method="POST">
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input type="text"
                required
                id="name"
                name="name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input type="email"
                required
                name="email"
                id="email" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="tel">Tel</Label>
              <Input type="tel"
                id="tel"
                name="tel" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="contact">Message</Label>
              <TextArea cols={50}
                id="contact"
                name="contact"
                rows={5}>
              </TextArea>
            </FormGroup>
            <FormFooter
              align="left">
              <Button type="submit">Send</Button>
            </FormFooter>
            <Input type="hidden" name="form-name" value="contact" />
          </form>
        </div>
        <div>
          <ul>
            <li>tel: 07904 139992</li>
            <li>email: <a href="mailto:bananablossom.kitchen@gmail.com">bananablossom.kitchen@gmail.com</a></li>
          </ul>
        </div>
      </Stack>
    </InsetBox>
  </Bg>
</Layout>
