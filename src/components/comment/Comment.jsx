import PropTypes from 'prop-types';
import withLogger from '@app/utils/logger/withLogger';

const Comment = ({ email, name, body }) => {
  return (
    <section>
      <div>Email: {email}</div>
      <div>Name: {name}</div>
      <div>Body: {body}</div>
    </section>
  );
};

Comment.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default withLogger(Comment);
