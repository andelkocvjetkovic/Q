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
  const [searchUserName, setSearchUserName] = useState('');
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

  return (
    <div>
      <SearchBar
        value={searchUserName}
        label='Search by username'
        name='search-by-username'
        onChange={e => {
          setSearchUserName(e.target.value);
          setUsers(e.target.value);
        }}
        {...getLoggerProps(rest)}
      />
      {isNotFound ? (
        <div>Not result found. Try to refine your query</div>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {list.map(p => (
            <PostCard
              key={propId(p)}
              id={propId(p)}
              title={propTitle(p)}
              body={propBody(p)}
              userId={propUserId(p)}
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
