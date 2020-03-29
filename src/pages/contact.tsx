import React from 'react';

import Button from '../components/Button';
import Card from '../components/Card';
import CardBody from '../components/CardBody';
import FormGroup from '../components/FormGroup';
import Label from '../components/Label';
import Layout from '../components/layout';

export default () => <Layout>
  <Card>
    <CardBody>
      <h1>Contact us</h1>
      <form name="contact" data-netlify="true" method="POST">
        <FormGroup>
          <Label htmlFor="name">Name *</Label>
          <input type="text"
            required
            id="name"
            name="name" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <input type="email"
            required
            name="email"
            id="email" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tel">Tel</Label>
          <input type="tel"
            id="tel"
            name="tel" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contact">Message</Label>
          <textarea cols={50}
            id="contact"
            name="contact"
            rows={20}>
          </textarea>
        </FormGroup>
        <FormGroup>
          <Button type="submit">Send</Button>
        </FormGroup>
        <input type="hidden" name="form-name" value="contact" />
      </form>
    </CardBody>
  </Card>
</Layout>
