import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

function useScrollTop() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}

export default useScrollTop;
