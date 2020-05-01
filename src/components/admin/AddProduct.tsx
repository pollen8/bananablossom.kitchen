import Axios from 'axios';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import useTraceUpdate from 'use-trace-update';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import Stack from '../layout/Stack';
import TextArea from '../TextArea';
import Skus from './Skus';

const createProduct = async (data) => {
  const response = await Axios.post("/.netlify/functions/product-create", data);
  return response;
};

const updateProduct = async (data: IProduct) => {
  const { id, ts, ...rest } = data;
  return await Axios.post('/.netlify/functions/product-update', {
    data: rest,
    id,
  })
}

const emptyProduct: IProduct = {
  id: '',
  name: '',
  course: 'main',
  description: '',
  price: 0,
  ts: 0,
  skus: [],
}

export interface ISku {
  id: string;
  name: string;
  price: string;
  image: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
}

export interface IProduct {
  course: string,
  id: string;
  name: string;
  description: string;
  price: number;
  ts: number;
  skus: ISku[];
}

interface IProps {
  addProduct: any;
  cancel: () => void;
  product: IProduct | undefined
}

const AddProduct: FC<IProps> = (props) => {
  useTraceUpdate(props)
  const {
    cancel,
    product,
    addProduct,
  } = props;
  const [data, setData] = useState(product ?? emptyProduct);
  useEffect(() => {
    setData(product ?? emptyProduct);
  }, [product])
  return (
    <Card>
      <CardBody>
        <h2>
          {data.name === ''
            ? 'Add product'
            : 'Edit product'}
        </h2>
        <Stack>
          <div>
            <FormGroup>
              <Label htmlFor="code">
                Name
            </Label>
              <Input
                id="code"
                size={40}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea id="description"
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Label>Course</Label>
            {
              ['starter', 'sides', 'main', 'dessert'].map((course) => <FormGroup key={course} check>
                <input
                  type="radio"
                  id={`menu-${course}`}
                  checked={data.course === course}
                  name={`sku-name[]`}
                  onChange={() => setData({ ...data, course })} />
                <Label check htmlFor={`menu-${course}`}>
                  {course}
                </Label>
              </FormGroup>)
            }

          </FormGroup>
        </Stack>
        <Skus
          product={data}
          remove={(sku: ISku) => {
            const p = {
              ...product,
              skus: (product.skus ?? []).filter((item) => item.id !== sku.id),
            }
            setData(p);
            updateProduct(p);
          }}
          setData={(sku: ISku) => {
            const existingSkus = product.skus ?? [];
            const index = existingSkus.findIndex((s) => s.id === sku.id)
            const p = {
              ...product,
              skus: index === -1
                ? [
                  ...existingSkus,
                  sku,
                ]
                : existingSkus.map((s) => s.id === sku.id ? sku : s)
            }
            setData(p);
            updateProduct(p);
          }} />
        <FormGroup>
          <Button
            outline
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={async () => {
              if (data.id === '') {
                const response = await createProduct(data);
                addProduct(response.data);
              } else {
                const update = await updateProduct(data);
              }
              setData(emptyProduct);
            }}
            color="primary">
            Submit
      </Button>
        </FormGroup>
      </CardBody>
    </Card>
  )
}

export default AddProduct;
