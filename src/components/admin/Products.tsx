import axios from 'axios';
import { format } from 'date-fns';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
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
const flatten = (d: { data: IProduct, ts: number, ref: any }) => ({
  ...d.data,
  ts: d.ts,
  id: getId(d.ref),
});

const Table = styled.table`
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
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelected] = useState<IProduct | undefined>()
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("/.netlify/functions/product-list");
      setProducts(res.data.map(flatten));
    };
    fetch();
  }, []);
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
                        const res = await axios.post("/.netlify/functions/product-delete", { ids: selectedRows });
                        setProducts(products.filter((p) => !selectedRows.includes(p.id)));
                        setSelectedRows([]);
                      }}
                    >delete</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products
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
                const index = products.findIndex((p) => p.id === id);
                if (index === -1) {
                  setProducts([flatten(product), ...products]);
                } else {
                  setProducts(products.map((p, i) => i === index ? flatten(product) : p));
                }
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

