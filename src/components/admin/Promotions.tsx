import axios from 'axios';
import React, {
  FC,
  useState,
} from 'react';
import {
  queryCache,
  useMutation,
  useQuery,
} from 'react-query';
import Select from 'react-select';
import styled from 'styled-components';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import DatePicker from '../DatePicker';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import {
  fetchProductList,
  flatten,
} from './Products';

const Row = styled.div`
  display: flex;
`;

export interface IPromotion {
  id: string;
  ts: string;
  percentage: number;
  expiry: Date,
  code: string;
  productId?: string;
}

export const fetchPromotions = async (): Promise<IPromotion[]> => {
  const res = await axios.post<any>("/.netlify/functions/promotion-list");
  return res.data.map(flatten);
}

export const fetchPromotion = async (code: string): Promise<IPromotion> => await axios.post("/.netlify/functions/promotion-item", { code });

const createPromotion = async (data: Partial<IPromotion>) => {
  await axios.post("/.netlify/functions/promotion-create", data);
}

const deletePromotion = async (selected: string[]) => {
  await axios.post("/.netlify/functions/promotion-delete", { ids: selected });
}

const Promotion: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<Partial<IPromotion>>({ percentage: 0, expiry: new Date(), code: '', productId: '' });
  const products = useQuery('products', fetchProductList);
  const promotions = useQuery<IPromotion[], 'promotions'>('promotions', fetchPromotions);
  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('promotions')
    },
  };
  const [mutate] = useMutation(createPromotion, mutationOptions)
  const [deleteMutate] = useMutation(deletePromotion, mutationOptions)

  if (products.status === 'loading' || promotions.status === 'loading') {
    return <>loading....</>
  }

  if (products.status === 'error' || promotions.status === 'error') {
    return <span>Error: {products.error}</span>
  }
  const productOptions = [{ value: '', label: 'any' }].concat(products.data.map((p) => ({ value: p.id, label: p.name })));
  return (
    <Row>
      <Card style={{ flexGrow: 1 }}>
        <CardBody>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Percent off</th>
                <th>Product</th>
                <th>Expiry</th>
                <th>
                  <Button size="sm"
                    onClick={async () => {
                      deleteMutate(selected);
                    }}
                  >delete</Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                promotions.data.map((data) => <tr key={data.id}>
                  <td>{data.code}</td>
                  <td>{data.percentage}</td>
                  <td>{products.data.find((p) => p.id === data.productId)?.name ?? 'any'}</td>
                  <td>{data.expiry}</td>

                  <td>
                    <input type="checkbox"
                      value={data.id}
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
          <Label htmlFor="product">Product</Label>
          <Select
            onChange={(v) => setData({ ...data, productId: v.value })}
            options={productOptions}
          />
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
            onClick={() => mutate(data)}
            color="primary">
            Submit
      </Button>

        </FormGroup>
      </div>
    </Row>
  );
};

export default Promotion;
