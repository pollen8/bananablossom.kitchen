import React from 'react';

import Button from '../components/Button';
import FormGroup from '../components/FormGroup';
import Label from '../components/Label';
import Layout from '../components/Layout';

export default () => <Layout><div>
  <h1>Contact</h1>
  <form action="https://getform.io/f/6d6272c7-2a8c-4d43-923e-a01fd9448366" method="POST">
    <FormGroup>
      <Label htmlFor="name">Name *</Label>
      <input type="text"
        required id="name"
        name="name" />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="email">Email *</Label>
      <input type="email" required
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
  </form>
</div>
</Layout>