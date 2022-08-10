import SearchBar from '@app/components/search-bar/SearchBar';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';
import { useState } from 'react';

const log = jest.spyOn(console, 'log').mockImplementation(() => {});
beforeEach(() => {
  log.mockReset();
});

describe('<SearchBar />', () => {
  it('Should render without errors', () => {
    render(
      <SearchBar
        name='search-bar'
        label='Search by username'
        onChange={jest.fn()}
        value=''
        {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })}
      />
    );
  });
  it('Should logged when is mounted', () => {
    render(
      <SearchBar
        name='search-bar'
        label='Search by username'
        onChange={jest.fn()}
        value=''
        {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })}
      />
    );
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith('Hello from SearchBar');
  });
  it('Should be controlled', async () => {
    const App = () => {
      const [value, setValue] = useState('');
      return (
        <div>
          <SearchBar
            name='search-bar'
            label='Search by username'
            onChange={e => setValue(e.target.value)}
            value={value}
            {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })}
          />
          <div data-testid='current-value'>{value}</div>
        </div>
      );
    };

    const { getByLabelText, getByTestId } = render(<App />);
    const user = userEvent.setup();
    const inputEl = getByLabelText('Search by username');
    const currentValue = getByTestId('current-value');

    await user.click(inputEl);
    await user.keyboard('hello world');
    expect(currentValue).toHaveTextContent('hello world');
  });
});
