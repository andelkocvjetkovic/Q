import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import PostCard from '@app/components/post-card/PostCard';
import SearchBar from '@app/components/search-bar/SearchBar';
import useDebounce from '@app/utils/use-debounce/useDebounce';
import { useUsers } from '@app/utils/use-fetch/useUsers';
import { propId, propTitle, propBody, propUserId } from '@app/utils/props';
import { matchSorter } from 'match-sorter';

const PostsList = ({ list, ...rest }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const users = useUsers();
  const setUsers = useDebounce(
    userName =>
      users.cata({
        Loading: () => setSearchParams({ userId: [] }),
        Error: () => setSearchParams({ userId: [] }),
        Success: users => {
          const matchedUsers = matchSorter(users, userName, { keys: ['name'] }).map(propId);
          if (userName.trim().length > 0) setSearchParams({ userId: matchedUsers.length > 0 ? matchedUsers : 'not-found' });
          else {
            setSearchParams({ userId: [] });
          }
        },
      }),
    500
  );
  const isNotFound = searchParams.get('userId') === 'not-found';

  const [searchUserName, setSearchUserName] = useState('');
  return (
    <div>
      <SearchBar
        className='w-80 sticky top-0 bg-gray-200 p-2 rounded'
        value={searchUserName}
        label='Search by user'
        name='search-by-username'
        placeholder='Start typing user first name or last name'
        onChange={e => {
          setSearchUserName(e.target.value);
          setUsers(e.target.value);
        }}
        {...getLoggerProps(rest)}
      />
      {isNotFound ? (
        <div className='mt-5 text-2xl lg:text-3xl text-indigo-500 text-center'>Not result found. Try to refine your query</div>
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
