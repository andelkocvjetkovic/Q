import PropTypes from 'prop-types';
import withLogger from '@app/utils/logger/withLogger';

const Comment = ({ email, name, body }) => {
  return (
    <section className='flex flex-col gap-1 border p-2'>
      <div className='text-gray-500 text-sm'>Email: {email}</div>
      <div className='text-gray-500 text-sm'>Name: {name}</div>
      <div className='text-gray-800 text-sm break-words'>Body: {body}</div>
    </section>
  );
};

Comment.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default withLogger(Comment);
