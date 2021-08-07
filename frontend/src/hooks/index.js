import { useState } from 'react';
import { useLocation } from 'react-router-dom'

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  } 
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}