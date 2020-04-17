import axios from 'axios';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Label from '../components/Label';
import Layout from '../components/layout';

const createPromotion = async (data) => {
  const response = await axios.post("/.netlify/functions/promotion-create", data);
  return response;
};


const Promotion: FC = () => {

  const [data, setData] = useState({ percentage: 0, expiry: new Date(), code: '' });
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/promotion-list");
      console.log('res data', res.data);
      setPromotions(res.data);
    };
    fetch();
  }, []);
  console.log('promotions', promotions);
  return (
    <Layout>
      <FormGroup>
        <Label htmlFor="code">
          Promotion code
      </Label>
        <Input
          id="code"
          onChange={(e) => setData({ ...data, code: e.target.value })}
          value={data.code} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="percentage">
          Percentage off
      </Label>
        <Input type="number"
          id="percentage"
          value={data.percentage}
          onChange={(e) => setData({ ...data, percentage: Number(e.target.value) })}
          min={0}
          max={100} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="expiry">
          Expiry
      </Label>
        <DatePicker
          onChange={(v) => setData({ ...data, expiry: v })}
          id="expiry" />
      </FormGroup>
      <FormGroup>
        <Button type="button"
          onClick={() => createPromotion(data)}
          color="primary">
          Submit
      </Button>

      </FormGroup>
    </Layout>
  );
};

export default Promotion;
