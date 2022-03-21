import { Image } from 'cloudinary-react';
import React, {
  FC,
  useState,
} from 'react';
import Modal from 'react-responsive-modal';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button';
import CardBody from '../CardBody';
import FormGroup from '../FormGroup';
import { Tr } from '../layout/Tr';
import {
  IProduct,
  ISku,
} from './AddProduct';
import AddSku, { blankSku } from './AddSku';

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
  const skus = product.skus ?? [];
  const [isOpen, onToggle] = useState(false);
  const [isDeleteOpen, onToggleDelete] = useState(false);
  const [selected, setSku] = useState<ISku>(blankSku);
  const [skuToDelete, setSkuToDelete] = useState<ISku>(null);
  return (
    <>
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
                <td><Image cloudName="pollen8" publicId={sku.image} width="150" crop="scale" /></td>
                <td>
                  <Button
                    size="sm"
                    outline
                    type="button"
                    color="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleDelete(true);
                      setSkuToDelete(sku);
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
          <h2>{selected.id !== '' ? 'Edit' : 'Add'} SKU</h2>
          <AddSku
            selected={selected}
            close={() => onToggle(false)}
            save={(sku: ISku) => {
              console.log('save', sku);
              if (sku.id === '') {
                sku.id = uuidv4();
              }
              setData(sku);
            }} />
        </Modal>
        <Modal open={isDeleteOpen}
          onClose={() => onToggleDelete(false)}
          center
        >
          <CardBody>
            <h2>Do you really want to delete this SKU?</h2>
            <FormGroup>
              <Button
                type="button"
                outline
                color="default"
                onClick={() => onToggleDelete(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                color="danger"
                onClick={(e) => {
                  remove(skuToDelete);
                  onToggleDelete(false)
                }}
              >
                Delete
              </Button>
            </FormGroup>
          </CardBody>
        </Modal>
      </CardBody>
    </>
  )
}

export default Skus;
