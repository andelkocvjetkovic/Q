import { render, act } from '@testing-library/react';
import App from '@app/App';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';
import { BrowserRouter } from 'react-router-dom';

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('<App />', () => {
  it.skip('Run without errors', () => {
    render(
      <BrowserRouter>
        <App {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
      </BrowserRouter>
    );
  });
});
