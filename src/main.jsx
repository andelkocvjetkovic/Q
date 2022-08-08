import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@app/App';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';

const LOGGER_MESSAGE = 'Hello from';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App {...getLoggerProps({ [LOGGER_PROPS_NAME]: LOGGER_MESSAGE })} />
    </BrowserRouter>
  </StrictMode>
);
