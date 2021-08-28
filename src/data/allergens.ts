import { theme } from '../context/theme';

export interface IAllergen {
  id: string;
  label: string;
  symbol: string;
  color: string;
}

export const allergens: IAllergen[] = [
  { id: 'vegetarian', label: 'Vegetarian', symbol: 'V', color: 'rgb(69, 178, 74)' },
  { id: 'vegan', label: 'Vegan', symbol: 'VE', color: 'rgb(69, 178, 74)' },
  { id: 'glutenFree', label: 'Gluten free', symbol: 'G', color: theme.colors.blue500 },
  { id: 'nuts', label: 'May contain nuts', symbol: 'N', color: 'rgb(200, 100, 100)' },
  { id: 'fish', label: 'Contains fish sauce', symbol: 'F', color: theme.colors.blue500 },
  { id: 'soy', label: 'Contains soy', symbol: 'S', color: theme.colors.blue500 },
  { id: 'lactose', label: 'Contains lactose', symbol: 'L', color: theme.colors.blue500 },
  { id: 'celery', label: 'Contains celery', symbol: 'C', color: theme.colors.blue500 },
  { id: 'egg', label: 'Contains egg', symbol: 'E', color: theme.colors.blue500 },
]
