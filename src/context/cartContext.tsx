import React, {
  createContext,
  useReducer,
} from 'react';

import {
  IProduct,
  ISku,
} from '../components/admin/AddProduct';
import { IPromotion } from '../components/admin/Promotions';

export interface IState {
  items: ICartItem[];
  promotion: Partial<IPromotion>;
}

const initialState: IState = typeof window === 'undefined' || sessionStorage.getItem('cart') === null
  ? {
    items: [],
    promotion: { percentage: 0 },
  }
  : JSON.parse(sessionStorage.getItem('cart'));

export interface ICartItem {
  product: IProduct,
  quantity: number;
  sku: ISku;
  discounted: number;
}

const calcDiscounted = (item: ICartItem, discount: number) => {
  const price = item.quantity * Number(item.sku.price);
  return discount === 0
    ? 0
    : price - (price * (discount / 100));
}

export interface ICartContext {
  state: IState,
  dispatch?: any,
}
const store = createContext<ICartContext>({ state: initialState });
const { Provider } = store;

export type Action = { type: 'CART_ADD'; item: ICartItem }
  | { type: 'CART_REMOVE'; item: ICartItem }
  | { type: 'CART_CLEAR' }
  | { type: 'SET_PROMOTION', promotion: IPromotion; };

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
        const { items, promotion } = state;
        const i = items.findIndex((item) => item.sku.id === action.item.sku.id);

        let discount = 0;
        // promotion
        if (promotion.percentage !== 0) {
          if (action.item.product.id === promotion.productId || promotion.productId === undefined) {
            discount = promotion.percentage;
          }
        }

        if (i === -1) {
          return handleStore({
            ...state,
            items: state.items.concat({ ...action.item, discounted: calcDiscounted(action.item, discount) }),
          });
        }
        const newItems = state.items.map((item, j) => {
          if (i === j) {
            const newItem = {
              ...state.items[i],
              quantity: state.items[i].quantity + action.item.quantity,
            }
            newItem.discounted = calcDiscounted(newItem, discount);
            return newItem;
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
      case 'SET_PROMOTION': {

        const items = (action.promotion.productId)
          ?
          state.items.map((item) => {
            const discount = item.product.id === action.promotion.productId
              ? action.promotion.percentage
              : 0;
            return { ...item, discounted: calcDiscounted(item, discount) };
          })

          : state.items.map((item) => ({ ...item, discounted: calcDiscounted(item, action.promotion.percentage) }));

        return handleStore({
          ...state,
          items,
          promotion: action.promotion,
        });

      }
      case 'CART_CLEAR':
        return handleStore({
          items: [],
          promotion: { percentage: 0 },
        });
      default:
        throw new Error();
    };

  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
