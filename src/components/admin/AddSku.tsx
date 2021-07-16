import { Image } from 'cloudinary-react';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import { allergens } from '../../data/allergens';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import Stack from '../layout/Stack';
import { ModalFooter } from '../ui/ModalFooter';
import { ISku } from './AddProduct';
import ImageUpload from './ImageUpload';

export const blankSku: ISku = {
  id: '',
  name: '',
  price: '',
  image: '',
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  nuts: false,
  unavailable: false,
};

interface IProps {
  selected?: ISku
  close: () => void;
  save: (sku: ISku) => void;
}

const AddSku: FC<IProps> = ({
  close,
  save,
  selected,
}) => {
  const [sku, setData] = useState<ISku>(selected ?? blankSku);
  useEffect(() => {
    setData(selected ?? blankSku);
  }, [selected])
  return (
    <>
      <Stack>
        <div>
          <FormGroup>
            <Label htmlFor="sku-name">Name</Label>
            <Input id="sku-name"
              value={sku.name}
              onChange={(e) => setData({ ...sku, name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="sku-amount">Amount (GBP)</Label>
            <Input id="sku-amount"
              value={sku.price}
              onChange={(e) => setData({ ...sku, price: e.target.value })} />
          </FormGroup>
        </div>
        <div>
          <Label>Options</Label>
          {
            allergens.map((allergen) => <FormGroup key={allergen.id}>
              <label>
                <input type="checkbox"
                  checked={sku[allergen.id]}
                  onChange={(e) => setData({ ...sku, [allergen.id]: e.target.checked })} />
                {' '}{allergen.label}</label>
            </FormGroup>
            )
          }
        </div>
      </Stack>

      <FormGroup>
        <Label>image</Label>
        <Image cloudName="pollen8" publicId={sku.image} width="50" crop="scale" />
        <ImageUpload
          onChange={(fileName) => {
            setData({ ...sku, image: fileName });
          }} />
      </FormGroup>

      <FormGroup>
        <label>
          <input type="checkbox"
            checked={sku.unavailable}
            onChange={(e) => setData({ ...sku, unavailable: e.target.checked })} />
          {' '}Unavailable (check to not show on site)</label>
      </FormGroup>

      <ModalFooter>
        <Button
          outline
          onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            save(sku);
            close();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default AddSku;
