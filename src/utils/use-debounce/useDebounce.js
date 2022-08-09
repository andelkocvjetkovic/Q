import { useRef, useMemo, useLayoutEffect } from 'react';
import debounce from 'lodash/debounce';

const useDebounce = (callback, delay) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(() => debounce((...args) => callbackRef.current(...args), delay), [delay]);
};

export default useDebounce;
