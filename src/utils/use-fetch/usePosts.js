import useFetch from '@app/utils/use-fetch/useFetch';
import { useSearchParams } from 'react-router-dom';

// getUsersQueryParams :: Array [Int] -> String
const getUsersQueryParams = users => users.map(userId => `userId=${userId}`).join('&');

const usePosts = () => {
  const [searchParams] = useSearchParams();
  const users = searchParams.getAll('userId');
  return useFetch(users.length > 0 ? `/posts?${getUsersQueryParams(users)}` : '/posts');
};

export default usePosts;
