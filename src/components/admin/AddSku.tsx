import { Image } from 'cloudinary-react';
import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import Stack from '../layout/Stack';
import { ISku } from './AddProduct';
import ImageUpload from './ImageUpload';

export const blankSku: ISku = {
  id: uuidv4(),
  name: '',
  price: '',
  image: '',
  vegetarian: false,
  vegan: false,
  glutenFree: false,
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
  console.log('render', sku);
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
          <FormGroup>
            <Label>Options</Label>
            <label>
              <input type="checkbox"
                checked={sku.vegetarian}
                onChange={(e) => setData({ ...sku, vegetarian: e.target.checked })} />
        vegetarian</label>
          </FormGroup>

          <FormGroup>
            <label>
              <input type="checkbox"
                checked={sku.vegan}
                onChange={(e) => setData({ ...sku, vegan: e.target.checked })} />
        vegan</label>
          </FormGroup>

          <FormGroup>
            <label>
              <input type="checkbox"
                checked={sku.glutenFree}
                onChange={(e) => setData({ ...sku, glutenFree: e.target.checked })} />
        gluten free</label>
          </FormGroup>
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
      {
        ['vegetarian', '',]
      }

      <FormGroup>
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
      </FormGroup>
    </>
  )
}

export default AddSku;
