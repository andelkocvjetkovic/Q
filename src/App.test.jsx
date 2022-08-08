import { render, act } from '@testing-library/react';
import App from '@app/App';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';
import { MemoryRouter } from 'react-router-dom';

jest.spyOn(console, 'log').mockImplementation(() => {});

describe.skip('<App />', () => {
  it('Run without errors', () => {
    render(
      <MemoryRouter initialEntries={['/posts']}>
        <App {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
      </MemoryRouter>
    );
  });
});
