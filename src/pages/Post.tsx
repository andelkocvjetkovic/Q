import { useParams } from 'react-router-dom';
import useFetch from '@app/utils/use-fetch/useFetch';
import PostCard from '@app/components/post-card/PostCard';
import withLogger from '@app/utils/logger/withLogger';
import { propId, propTitle, propBody, propUserId } from '@app/utils/props';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';
import { Post } from '@app/utils/types';

const Post = () => {
  const { postId } = useParams();
  const post = useFetch<Post>(`posts/${postId}`);

  if (post.kind === 'loading') return <SpinnerFullHeight />;
  else if (post.kind === 'error') return <div>Something went wrong ${post.error.message}</div>;
  else
    return (
      <PostCard
        key={propId(post.data)}
        id={propId(post.data)}
        title={propTitle(post.data)}
        body={propBody(post.data)}
        userId={propUserId(post.data)}
      />
    );
};

export default withLogger(Post);
