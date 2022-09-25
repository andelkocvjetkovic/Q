import PropTypes from 'prop-types';
import { useUsers } from '@app/utils/use-fetch/useUsers';
import withLogger from '@app/utils/logger/withLogger';
import { curry, prop } from 'ramda';
import { User } from '@app/utils/types';
import * as O from 'fp-ts/Option';

const findById = curry((id: number, xs: User[]) => {
  const user = xs.find(u => u.id === id);
  return user ? O.some(user) : O.none;
});

type Props = {
  userId: number;
};

const showUserInfo = O.match(
  () => 'Unknown user',
  (value: User) => prop('name', value)
);

const UserFullName = ({ userId }: Props) => {
  const userData = useUsers();

  if (userData.kind === 'loading') return <div>Loading ...</div>;
  else if (userData.kind === 'error') return <div>Something went wrong</div>;
  else return <h4 className='text-xl font-medium text-indigo-500'>{showUserInfo(findById(userId, userData.data))}</h4>;
};

UserFullName.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default withLogger(UserFullName);
