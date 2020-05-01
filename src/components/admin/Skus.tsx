import { Image } from 'cloudinary-react';
import React, {
  FC,
  useState,
} from 'react';
import Modal from 'react-responsive-modal';

import Button from '../Button';
import CardBody from '../CardBody';
import {
  IProduct,
  ISku,
} from './AddProduct';
import AddSku, { blankSku } from './AddSku';
import { Tr } from './Products';

interface IProps {
  product: IProduct;
  setData: (sku: ISku) => void;
  remove: (sku: ISku) => void;
}


const Skus: FC<IProps> = ({
  product,
  remove,
  setData,
}) => {
  if (!product) {
    return null;
  }
  console.log('SKUSSSSS re-render!');
  const skus = product.skus ?? [];
  const [isOpen, onToggle] = useState(false);
  const [selected, setSku] = useState<ISku>(blankSku);
  return (
    <CardBody>
      <h3>Skus</h3>
      <Button
        type="button"
        onClick={() => {
          setSku(blankSku);
          onToggle(true);
        }}>
        Add
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            skus.map((sku) => <Tr
              key={sku.id}
              onClick={() => {
                console.log('row click')
                setSku(sku);
                onToggle(true);
              }}>
              <td>{sku.name}</td>
              <td>{sku.price}</td>
              <td><Image cloudName="pollen8" publicId={sku.image} width="50" crop="scale" /></td>
              <td>
                <Button
                  size="sm"
                  outline
                  type="button"
                  color="danger"
                  onClick={(e) => {
                    console.log('btn click');
                    e.preventDefault();
                    e.stopPropagation();
                    remove(sku);
                  }}
                >
                  Delete
                </Button>
              </td>
            </Tr>)
          }
        </tbody>
      </table>
      <Modal open={isOpen}
        onClose={() => onToggle(false)}
        center
      >
        <h2>Add SKU</h2>
        <AddSku
          selected={selected}
          close={() => onToggle(false)}
          save={(sku: ISku) => setData(sku)} />
      </Modal>
    </CardBody>
  )
}

export default Skus;
