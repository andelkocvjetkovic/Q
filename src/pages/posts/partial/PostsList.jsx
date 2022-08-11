import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import PostCard from '@app/components/post-card/PostCard';
import { propId, propTitle, propBody, propUserId } from '@app/utils/props';

const PostsList = ({ list, ...rest }) => {
  let [searchParams] = useSearchParams();
  const isNotFound = searchParams.get('userId') === 'not-found' && list.length === 0;

  return (
    <div>
      {isNotFound ? (
        <div className='mt-12 text-2xl lg:text-3xl text-indigo-500 text-center'>
          Not result found. <br /> Try to redefine your query
        </div>
      ) : (
        <div className='mt-5 grid justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {list.map(p => (
            <PostCard
              key={propId(p)}
              id={propId(p)}
              title={propTitle(p)}
              body={propBody(p)}
              userId={propUserId(p)}
              showReadmore
              {...getLoggerProps(rest)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

PostsList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default withLogger(PostsList);
