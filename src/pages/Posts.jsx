import usePosts from '@app/utils/use-fetch/usePosts';
import { getLoggerProps } from '@app/utils/logger/withLogger';
import PostCard from '@app/components/post-card/PostCard';
import { propId, propTitle, propBody, propUserId } from '@app/utils/props';

const Posts = props => {
  const posts = usePosts();
  return posts.cata({
    Loading: () => <div>Loading ...</div>,
    Success: data => (
      <div className='grid grid-cols-2 gap-4'>
        {data.map(p => (
          <PostCard
            key={propId(p)}
            id={propId(p)}
            title={propTitle(p)}
            body={propBody(p)}
            userId={propUserId(p)}
            {...getLoggerProps(props)}
          />
        ))}
      </div>
    ),
    Error: error => <div>Something went wrong! {error.message}</div>,
  });
};

export default Posts;
