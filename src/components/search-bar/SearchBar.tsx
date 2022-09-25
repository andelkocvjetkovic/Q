import withLogger from '@app/utils/logger/withLogger';
import PropTypes from 'prop-types';
import { FormEventHandler } from 'react';

type SearchBarPropes = {
  name: string;
  label: string;
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
};

const SearchBar = ({ name, label, value, onChange, className, placeholder }: SearchBarPropes) => {
  return (
    <div className={className}>
      <label htmlFor={name} className='text-sm text-gray-700'>
        {label}
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2'
        type='search'
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default withLogger(SearchBar);
