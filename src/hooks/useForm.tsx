import { id } from 'date-fns/locale';
import React, { useState } from 'react';
import validate, { Validation } from 'validate-promise';

interface IProps<T extends object> {
  id: string;
  contract?: Array<Validation<T>>;
  defaultValues?: T;
  callback?: (values: T) => Promise<void>;
}

type TErrors<T extends object> = {
  [key in keyof T]: string[];
}

export const useForm = <T extends object>(props: IProps<T>) => {
  const {
    id,
    contract,
    defaultValues = {} as T,
    callback,
  } = props;
  const [errors, setErrors] = useState<Partial<TErrors<T>>>({});
  const [values, setValues] = useState<T>(defaultValues);
  const [touched, setTouched] = useState<Array<keyof T>>([]);
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    await validate(contract, values);
    callback && await callback(values);
  }

  const handleInputChanges = async (newValues: Partial<T>) => {
    const newTouched = touched.concat(name);
    try {
      const newData = { ...values, ...newValues };
      setTouched(newTouched);
      setValues(newData);
      sessionStorage.setItem('form-' + id, JSON.stringify(newData));
      if (contract) {
        await validate(contract, newData);
      }
    } catch (e) {
      const touchedErrors = {};
      Object.keys(e).filter((k) => newTouched.includes(k as keyof T)).forEach((k) => touchedErrors[k] = e[k]);
      setErrors(touchedErrors);
    }
  }
  const handleInputChange = async (name: keyof T, value: any) => {
    const newTouched = touched.concat(name);
    try {
      const newData = { ...values, [name]: value };
      setTouched(newTouched);
      setValues(newData);
      sessionStorage.setItem('form-' + id, JSON.stringify(newData));
      if (contract) {
        await validate(contract, newData);
      }
    } catch (e) {
      const touchedErrors = {};
      Object.keys(e).filter((k) => newTouched.includes(k as keyof T)).forEach((k) => touchedErrors[k] = e[k]);
      setErrors(touchedErrors);
    }
  }

  const formatError = (messages: string[]) => {
    return messages.map((msg) => <div key={msg}>{msg}</div>)
  }

  const validateTouched = async () => {
    try {
      await validate(contract, values);
    } catch (e) {
      const touchedErrors = {};
      Object.keys(e).filter((k) => touched.includes(k as keyof T)).forEach((k) => touchedErrors[k] = e[k]);
      setErrors(touchedErrors);
    }
  }

  const validateSome = async (keys: Array<keyof T>) => {
    try {
      await validate(contract, values);
    } catch (e) {
      const touchedErrors = {};
      Object.keys(e).filter((k) => keys.includes(k as keyof T)).forEach((k) => touchedErrors[k] = e[k]);
      setErrors(touchedErrors);
      throw e;
    }
  }

  return {
    errors,
    values,
    handleSubmit,
    handleInputChange,
    formatError,
    validateTouched,
    validateSome,
    handleInputChanges,
  }
}
