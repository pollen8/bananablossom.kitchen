import React, {
  createContext,
  useReducer,
} from 'react';

import { IMeal } from '../components/MealList';

interface IState {
  items: IMeal[];
}

const initialState: IState = {
  items: [],
};

const store = createContext<any>(initialState);
const { Provider } = store;

export type Action = { type: 'CART_ADD'; item: IMeal }
  | { type: 'CART_REMOVE'; item: IMeal }
  | { type: 'CART_CLEAR' };

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state: IState, action: Action) => {
    console.log('action', action);
    switch (action.type) {
      case 'CART_ADD':
        const i = state.items.findIndex((item) => item.id === action.item.id);
        if (i === -1) {
          return {
            ...state,
            items: state.items.concat(action.item),
          }
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
        return {
          ...state,
          items: newItems,
        };
      case 'CART_REMOVE': {
        const items = state.items.filter((item) => item.id !== action.item.id);
        return {
          ...state,
          items,
        };
      }
      default:
        throw new Error();
    };
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
