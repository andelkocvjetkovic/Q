import withLogger from '@app/utils/logger/withLogger';
import { useParams } from 'react-router-dom';
import useFetch from '@app/utils/use-fetch/useFetch';

const Post = () => {
  let { postId } = useParams();
  const post = useFetch(`posts/${postId}`);

  return post.cata({
    Loading: () => <div>Loading ...</div>,
    Error: e => <div>Something went wrong ${e.message}</div>,
    Success: p => <div>{JSON.stringify(p)}</div>,
  });
};

export default withLogger(Post);
