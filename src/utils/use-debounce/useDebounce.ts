import { useRef, useMemo, useLayoutEffect } from 'react';
import debounce from 'lodash/debounce';

const useDebounce = <T, P>(callback: (...args: T[]) => P, delay = 250) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => debounce((...args: T[]) => callbackRef.current(...args), delay), [delay]);
};

export default useDebounce;
