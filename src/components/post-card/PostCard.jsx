import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import UserFullName from '@app/components/user/UserFullName';

const PostCard = ({ id, title, body, userId, ...rest }) => (
  <Link to={`${id}`}>
    <div>{title}</div>
    <UserFullName userId={userId} {...getLoggerProps(rest)} />
    <div>{body}</div>
  </Link>
);

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default withLogger(PostCard);
