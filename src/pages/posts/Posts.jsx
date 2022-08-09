import { useState } from 'react';
import usePosts from '@app/utils/use-fetch/usePosts';
import PostsList from '@app/pages/posts/partial/PostsList';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';

const Posts = props => {
  const [queryUsers, setQueryUsers] = useState([]);
  const posts = usePosts(queryUsers);

  return posts.cata({
    Loading: () => <div>Loading ...</div>,
    Success: data => <PostsList list={data} setQueryUsers={setQueryUsers} {...getLoggerProps(props)} />,
    Error: error => <div>Something went wrong! {error.message}</div>,
  });
};

export default withLogger(Posts);
