import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

function useScrollTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default useScrollTop;
