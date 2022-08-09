import useFetch from '@app/utils/use-fetch/useFetch';
import { useSearchParams } from 'react-router-dom';
const usePosts = () => {
  const [searchParams] = useSearchParams();
  const users = searchParams.getAll('userId');
  return useFetch(users.length > 0 ? `/posts?${users.map(userId => `userId=${userId}`).join('&')}` : '/posts');
};

export default usePosts;
