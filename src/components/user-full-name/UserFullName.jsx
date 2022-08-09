import PropTypes from 'prop-types';
import { useUsers } from '@app/utils/use-fetch/useUsers';
import Maybe from 'folktale/maybe';
import withLogger from '@app/utils/logger/withLogger';
import { curry, propEq, find, prop } from 'ramda';

const findById = curry((id, xs) => {
  let item = find(propEq('id', id))(xs);
  return item ? Maybe.Just(item) : Maybe.Nothing();
});

const UserFullName = ({ userId }) => {
  const userData = useUsers();

  return userData.cata({
    Loading: () => <div>Loading ...</div>,
    Success: users => (
      <div>
        {findById(userId, users).matchWith({
          Just: ({ value }) => prop('name', value),
          Nothing: () => 'Unknown user',
        })}
      </div>
    ),
    Error: () => <div>Something went wrong</div>,
  });
};

UserFullName.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default withLogger(UserFullName);
