import Axios from 'axios';
import {
  useEffect,
  useState,
} from 'react';

export const useDiscount = (setDiscount) => {
  const [value, setValue] = useState(0);

  const checkCode = async (code: string) => {
    const res = await Axios.post("/.netlify/functions/promotion-item", { code });
    return res.data;
  }

  const updateDiscount = (v: number) => {
    setValue(v);
    setDiscount(v);
  };

  useEffect(() => {
    const c = window.sessionStorage.getItem('code');
    const fetch = async () => {
      const res = await checkCode(c);
      updateDiscount(res?.percentage ?? 0);
    }
    if (c) {
      fetch();
    }
  }, []);

  return {
    checkCode,
    value,
    updateDiscount,
  }
}
