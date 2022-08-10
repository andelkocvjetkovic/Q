import { useParams } from 'react-router-dom';
import useFetch from '@app/utils/use-fetch/useFetch';
import PostCard from '@app/components/post-card/PostCard';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import { propId, propTitle, propBody, propUserId } from '@app/utils/props';

const Post = props => {
  let { postId } = useParams();
  const post = useFetch(`posts/${postId}`);

  return post.cata({
    Loading: () => <div>Loading ...</div>,
    Error: e => <div>Something went wrong ${e.message}</div>,
    Success: p => (
      <PostCard
        key={propId(p)}
        id={propId(p)}
        title={propTitle(p)}
        body={propBody(p)}
        userId={propUserId(p)}
        {...getLoggerProps(props)}
      />
    ),
  });
};

export default withLogger(Post);
