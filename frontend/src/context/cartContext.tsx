import React, {
  createContext,
  useReducer,
} from 'react';

import { TSkuProduct } from '../components/MealList';

interface IState {
  items: TSkuProduct[];
}

const initialState: IState = typeof window === 'undefined' || sessionStorage.getItem('cart') === null
  ? {
    items: [],
  }
  : JSON.parse(sessionStorage.getItem('cart'));


const store = createContext<any>(initialState);
const { Provider } = store;

export type Action = { type: 'CART_ADD'; item: TSkuProduct }
  | { type: 'CART_REMOVE'; item: TSkuProduct }
  | { type: 'CART_CLEAR' };

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state: IState, action: Action) => {
    const handleStore = (state: IState): IState => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cart', JSON.stringify(state));
      }
      return state;
    };

    switch (action.type) {
      case 'CART_ADD':
        const i = state.items.findIndex((item) => item.id === action.item.id && item.selectedSKUIndex === action.item.selectedSKUIndex);
        if (i === -1) {
          return handleStore({
            ...state,
            items: state.items.concat(action.item),
          });
        }
        const newItems = state.items.map((item, j) => {
          if (i === j) {
            return {
              ...state.items[i],
              quantity: state.items[i].quantity + action.item.quantity,
            }
          }
          return item;
        })
        return handleStore({
          ...state,
          items: newItems,
        });
      case 'CART_REMOVE': {
        const items = state.items.filter((item) => item.id !== action.item.id);
        return handleStore({
          ...state,
          items,
        });
      }
      default:
        throw new Error();
    };

  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
