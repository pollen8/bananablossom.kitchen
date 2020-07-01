import axios from 'axios';
import { format } from 'date-fns';
import React, {
  FC,
  useState,
} from 'react';
import {
  queryCache,
  useMutation,
  useQuery,
} from 'react-query';
import styled from 'styled-components';

import { RouteComponentProps } from '@reach/router';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import Stack from '../layout/Stack';
import AddProduct, { IProduct } from './AddProduct';

const getId = (item: any) => {
  return item['@ref'].id
}

export const Tr = styled.tr`
cursor: pointer;
 &:hover {
   background-color: ${(props) => props.theme.colors.blue900};
 }
`;
export const flatten = (d: { data: IProduct, ts: number, ref: any }) => ({
  ...d.data,
  ts: d.ts,
  id: getId(d.ref),
});

export const fetchProductList = async () => {
  const res = await axios.post("/.netlify/functions/product-list");
  return res.data.map(flatten);
}

const deleteProduct = async (selectedRows: string[]) => {
  await axios.post("/.netlify/functions/product-delete", { ids: selectedRows });
}

const createProduct = async (data) => {

}
export const Table = styled.table`
  @media (max-width: 640px){ 
  .description {
    display:none;
  }
`;

const FlexRow = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Products: FC<RouteComponentProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelected] = useState<IProduct | undefined>()

  const mutationOptions = {
    onSuccess: () => {
      queryCache.refetchQueries('products')
    },
  };
  const [mutate] = useMutation(createProduct, mutationOptions)
  const [deleteMutate] = useMutation(deleteProduct, mutationOptions)

  const products = useQuery<IProduct[], 'products'>('products', fetchProductList);
  if (products.status === 'loading') {
    return <>loading....</>
  }

  if (products.status === 'error') {
    return <span>Error: {products.error.message}</span>
  }
  return (
    <>
      <h1>Products</h1>
      <FlexRow>
        <Button
          onClick={() => {
            setSelected(undefined);
            setShowForm(true);
          }}>New</Button>
        <input type="search"
          placeholder="search..."
          onChange={(e) => setSearch(e.target.value)} />
      </FlexRow>
      <Stack reverse>
        <Card>

          <CardBody>
            <Table style={{ backgroundColor: '#fff' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="description">Description</th>
                  <th>
                    <Button size="sm"
                      onClick={async () => {
                        deleteMutate(selectedRows);
                        setSelectedRows([]);
                      }}
                    >delete</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products
                    .data
                    .filter((data) => search === '' || data.name.toLowerCase().includes(search.toLowerCase()))
                    .map((data) => <Tr
                      key={data.id}
                      onClick={() => {
                        setSelected(data);
                        setShowForm(true);
                      }}>
                      <td>
                        {data.name}
                        <div>
                          <small>
                            {format(data.ts / 1000, 'dd MMMM yyyy')}
                          </small>
                        </div>
                      </td>
                      <td className="description">{data.description}</td>
                      <td>
                        <input type="checkbox"
                          value={data.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              selectedRows.push(e.target.value);
                              setSelectedRows(selectedRows);
                            } else {
                              setSelectedRows(selectedRows.filter((s) => s !== e.target.value));
                            }
                          }}
                        />
                      </td>
                    </Tr>
                    )
                }

              </tbody>
            </Table>
          </CardBody>
        </Card>
        <div>
          {
            showForm && <AddProduct
              product={selectedProduct}
              cancel={() => {
                setSelected(undefined);
                setShowForm(false);
              }}
              addProduct={(product) => {
                const id = getId(product.ref);
                const index = products.data.findIndex((p) => p.id === id);
                createProduct(product);
                // if (index === -1) {
                //   setProducts([flatten(product), ...products.data]);
                // } else {
                //   setProducts(products.data.map((p, i) => i === index ? flatten(product) : p));
                // }

                setShowForm(false);
              }}
            />
          }

        </div>
      </Stack>
    </>
  )
}

export default Products;

