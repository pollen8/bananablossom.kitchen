import React, {
  createContext,
  useReducer,
} from 'react';

import {
  IProduct,
  ISku,
} from '../components/admin/AddProduct';

interface IState {
  items: ICartItem[];
}

const initialState: IState = typeof window === 'undefined' || sessionStorage.getItem('cart') === null
  ? {
    items: [],
  }
  : JSON.parse(sessionStorage.getItem('cart'));

export interface ICartItem {
  product: IProduct,
  quantity: number;
  sku: ISku;
}

const store = createContext<any>(initialState);
const { Provider } = store;

export type Action = { type: 'CART_ADD'; item: ICartItem }
  | { type: 'CART_REMOVE'; item: ICartItem }
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
        const i = state.items.findIndex((item) => item.sku.id === action.item.sku.id);
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
        const items = state.items.filter((item) => item.sku.id !== action.item.sku.id);
        return handleStore({
          ...state,
          items,
        });
      }
      case 'CART_CLEAR':
        return handleStore({
          items: [],
        });
      default:
        throw new Error();
    };

  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
