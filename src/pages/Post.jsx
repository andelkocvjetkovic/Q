import withLogger from '@app/utils/logger/withLogger';
import { useParams } from 'react-router-dom';
const Post = () => {
  let { postId } = useParams();

  return <div>{postId}</div>;
};

export default withLogger(Post);
