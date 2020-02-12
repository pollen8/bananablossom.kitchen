import React from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';

export default () => <Layout><div>
  <h1>Contact</h1>
  <form action="https://getform.io/f/6d6272c7-2a8c-4d43-923e-a01fd9448366" method="POST">
    <textarea cols={50}
      rows={20}>
    </textarea>
    <Button type="submit">Send</Button>
  </form>
</div>
</Layout>