import { useState, useEffect } from "react";

interface useDebounceProps {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: useDebounceProps) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};
