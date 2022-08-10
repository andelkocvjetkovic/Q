import usePosts from '@app/utils/use-fetch/usePosts';
import PostsList from '@app/pages/posts/partial/PostsList';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';

const Posts = props => {
  const posts = usePosts();

  return posts.cata({
    Loading: () => <SpinnerFullHeight {...getLoggerProps(props)} />,
    Success: data => <PostsList list={data} {...getLoggerProps(props)} />,
    Error: error => <div className='text-2xl text-center p-2'>Something went wrong! {error.message}</div>,
  });
};

export default withLogger(Posts);
