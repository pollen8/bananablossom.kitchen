import Axios from 'axios';
import {
  useContext,
  useEffect,
  useState,
} from 'react';

import { IPromotion } from '../components/admin/Promotions';
import { store } from '../context/cartContext';

export const useDiscount = () => {
  const { state, dispatch } = useContext(store);
  const [error, setError] = useState('');
  const [promotion, setPromotion] = useState<Partial<IPromotion>>({ percentage: 0 });

  const checkCode = async (code: string) => {
    const res = await Axios.post("/.netlify/functions/promotion-item", { code });
    return res.data;
  }

  const updateDiscount = (promotion: Partial<IPromotion>) => {
    setPromotion(promotion);
    dispatch({ type: 'SET_PROMOTION', promotion })
  };

  useEffect(() => {
    const c = window.sessionStorage.getItem('code');
    const fetch = async () => {
      const res = await checkCode(c);
      updateDiscount({
        ...res,
        percentage: res.percentage ?? 0
      });
    }
    if (c) {
      fetch();
    }
  }, []);

  const search = async (code: string) => {
    window.sessionStorage.setItem('code', code);
    const res = await checkCode(code);
    const v = res?.percentage ?? 0;
    updateDiscount({
      ...res,
      percentage: res.percentage ?? 0
    });
    if (v === 0) {
      setError('Sorry we could not find that code');
    }
  }
  return {
    promotion,
    updateDiscount,
    search,
    error,
    setError,
  }
}
