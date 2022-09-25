import { useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePosts from '@app/utils/use-fetch/usePosts';
import PostsList from '@app/pages/posts/partial/PostsList';
import withLogger from '@app/utils/logger/withLogger';
import SpinnerFullHeight from '@app/components/spinner/SpinnerFullHeight';
import SearchBar from '@app/components/search-bar/SearchBar';
import useDebounce from '@app/utils/use-debounce/useDebounce';
import { useUsers } from '@app/utils/use-fetch/useUsers';
import { propId } from '@app/utils/props';
import { matchSorter } from 'match-sorter';

const Posts = () => {
  const [, setSearchParams] = useSearchParams();
  const posts = usePosts();
  const users = useUsers();
  const [searchUserName, setSearchUserName] = useState('');
  const setUsers = useDebounce((userName: string) => {
    if (users.kind === 'loading') setSearchParams({ userId: [] });
    else if (users.kind === 'error') setSearchParams({ userId: [] });
    else {
      const matchedUsers = matchSorter(users.data, userName, { keys: ['name'] });
      if (userName.trim().length > 0)
        setSearchParams({
          //prettier-ignore
          userId: matchedUsers.length > 0
            ? matchedUsers.map(propId).map(String)
            : 'not-found',
        });
      else {
        setSearchParams({ userId: [] });
      }
      window.scrollTo({ top: 0 });
    }
  }, 500);

  return (
    <div>
      <div className='sticky top-0 bg-gray-200 p-2 rounded'>
        <SearchBar
          className='max-w-xs w-full'
          value={searchUserName}
          label='Search by user'
          name='search-by-username'
          placeholder='Start typing user first name or last name'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchUserName(e.target.value);
            setUsers(e.target.value);
          }}
        />
      </div>
      {posts.cata({
        Loading: () => <SpinnerFullHeight />,
        Success: data => <PostsList list={data} />,
        Error: error => <div className='text-2xl text-center p-2'>Something went wrong! {error.message}</div>,
      })}
    </div>
  );
};

export default withLogger(Posts);
