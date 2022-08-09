import withLogger from '@app/utils/logger/withLogger';
import PropTypes from 'prop-types';

const SearchBar = ({ name, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type='search' name={name} id={name} value={value} onChange={onChange} />
    </div>
  );
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withLogger(SearchBar);
