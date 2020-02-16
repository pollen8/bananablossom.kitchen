import React, { useState } from 'react';

export const useForm = ({
  defaultValues = {},
  callback,
}) => {
  const [values, setValues] = useState(defaultValues);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  }

  const handleInputChange = (event) => {
    event.persist();
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  }

  return {
    values,
    handleSubmit,
    handleInputChange,
  }
}
