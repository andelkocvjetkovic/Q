import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withLogger from '@app/utils/logger/withLogger';
import UserFullName from '@app/components/user-full-name/UserFullName';
import useComments from '@app/utils/use-fetch/useComments';
import { propId, propEmail, propBody, propName } from '@app/utils/props';
import Comment from '@app/components/comment/Comment';

type PostCardProps = {
  id: number;
  title: string;
  body: string;
  userId: number;
  showReadmore?: boolean;
};

type PostCardCommentsProps = {
  postId: number;
};

const PostCardComments = ({ postId }: PostCardCommentsProps) => {
  const comments = useComments(postId);

  if (comments.kind === 'loading') return <div className='text-gray-400 mt-3'>Loading comments ...</div>;
  else if (comments.kind === 'error') return <div>Something went wrong {comments.error.message}</div>;
  else
    return (
      <div className='mt-3'>
        <div className='text-lg'>Comments: </div>
        <div className='flex flex-col gap-3'>
          {comments.data.map(c => (
            <Comment key={propId(c)} name={propName(c)} email={propEmail(c)} body={propBody(c)} />
          ))}
        </div>
      </div>
    );
};

const PostCard = ({ id, title, body, userId, showReadmore }: PostCardProps) => {
  return (
    <div className='py-4 px-8 bg-white shadow-lg rounded-lg'>
      <h2 className='text-gray-800 text-3xl font-semibold'>{title}</h2>
      <UserFullName userId={userId} />
      <p className='mt-2 text-gray-600'>{body}</p>
      {showReadmore && (
        <Link
          to={`${id}`}
          className={`mt-3 text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center`}
        >
          Read more
        </Link>
      )}
      <PostCardComments postId={id} />
    </div>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  showReadmore: PropTypes.bool,
};

export default withLogger(PostCard);
