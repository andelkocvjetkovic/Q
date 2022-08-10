import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import UserFullName from '@app/components/user-full-name/UserFullName';
import useComments from '@app/utils/use-fetch/useComments';
import { propId, propEmail, propBody, propName } from '@app/utils/props';

const PostCard = ({ id, title, body, userId, ...rest }) => {
  const comments = useComments(id);
  return (
    <Link to={`${id}`}>
      <div>{title}</div>
      <UserFullName userId={userId} {...getLoggerProps(rest)} />
      <div>{body}</div>
      {comments.cata({
        Loading: () => <div>Loading ...</div>,
        Error: e => <div>Something went wrong {e.message}</div>,
        Success: c => (
          <div>
            <div>Comments: </div>
            {c.map(c => (
              <div key={propId(c)}>
                <div>Email: {propEmail(c)}</div>
                <div>Name: {propName(c)}</div>
                <div>Body: {propBody(c)}</div>
              </div>
            ))}
          </div>
        ),
      })}
    </Link>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default withLogger(PostCard);
