import axios from 'axios';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import DatePicker from '../DatePicker';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';

;

const Row = styled.div`
  display: flex;
`;

const getId = (item: any) => {
  return item['@ref'].id
}

const Promotion: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState({ percentage: 0, expiry: new Date(), code: '' });
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/promotion-list");
      setPromotions(res.data);
    };
    fetch();
  }, []);

  const createPromotion = async (data) => {
    const response = await axios.post("/.netlify/functions/promotion-create", data);
    setPromotions([...promotions, response.data]);
  };

  return (
    <Row>
      <Card style={{ flexGrow: 1 }}>
        <CardBody>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Percent off</th>
                <th>Expiry</th>
                <th>
                  <Button size="sm"
                    onClick={async () => {
                      console.log('click');
                      const res = await axios.post("/.netlify/functions/promotion-delete", { ids: selected });
                      console.log('res data', res.data);
                      setPromotions(promotions.filter((p) => !selected.includes(p.ref['@ref'].id)));
                      setSelected([]);
                    }}
                  >delete</Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                promotions.map(({ ref, data }) => <tr>
                  <td>{data.code}</td>
                  <td>{data.percentage}</td>
                  <td>{data.expiry}</td>

                  <td>
                    <input type="checkbox"
                      value={getId(ref)}
                      onChange={(e) => {
                        e.preventDefault();
                        if (e.target.checked) {
                          selected.push(e.target.value);
                          setSelected(selected);
                        } else {
                          setSelected(selected.filter((s) => s !== e.target.value));
                        }
                      }}
                    />
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </CardBody>
      </Card>

      <div style={{ margin: '0 0 0 2rem', minWidth: '15rem' }}>
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
          <Button
            type="button"
            onClick={() => createPromotion(data)}
            color="primary">
            Submit
      </Button>

        </FormGroup>
      </div>
    </Row>
  );
};

export default Promotion;
