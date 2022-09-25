import useFetch from '@app/utils/use-fetch/useFetch';
import { useSearchParams } from 'react-router-dom';
import { Post } from '@app/utils/types';

// getUsersQueryParams :: Array [Int] -> String
const getUsersQueryParams = (users: string[]) => users.map(userId => `userId=${userId}`).join('&');

const usePosts = () => {
  const [searchParams] = useSearchParams();
  const users = searchParams.getAll('userId');
  return useFetch<Post[]>(users.length > 0 ? `/posts?${getUsersQueryParams(users)}` : '/posts');
};

export default usePosts;
