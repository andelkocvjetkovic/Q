import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePosts from '@app/utils/use-fetch/usePosts';
import PostsList from '@app/pages/posts/partial/PostsList';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';
import SearchBar from '@app/components/search-bar/SearchBar';
import useDebounce from '@app/utils/use-debounce/useDebounce';
import { useUsers } from '@app/utils/use-fetch/useUsers';
import { propId } from '@app/utils/props';
import { matchSorter } from 'match-sorter';

const Posts = props => {
  let [, setSearchParams] = useSearchParams();
  const posts = usePosts();
  const users = useUsers();
  const [searchUserName, setSearchUserName] = useState('');
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
          window.scrollTo({ top: 0 });
        },
      }),
    500
  );

  return (
    <div>
      <div className='sticky top-0 bg-gray-200 p-2 rounded'>
        <SearchBar
          className='max-w-xs w-full'
          value={searchUserName}
          label='Search by user'
          name='search-by-username'
          placeholder='Start typing user first name or last name'
          onChange={e => {
            setSearchUserName(e.target.value);
            setUsers(e.target.value);
          }}
          {...getLoggerProps(props)}
        />
      </div>
      {posts.cata({
        Loading: () => <SpinnerFullHeight {...getLoggerProps(props)} />,
        Success: data => <PostsList list={data} {...getLoggerProps(props)} />,
        Error: error => <div className='text-2xl text-center p-2'>Something went wrong! {error.message}</div>,
      })}
    </div>
  );
};

export default withLogger(Posts);
