import { render } from '@testing-library/react';
import withLogger, { LOGGER_PROPS_NAME, getLoggerProps } from '@app/utils/logger/withLogger';
import PropTypes from 'prop-types';

const log = jest.spyOn(console, 'log').mockImplementation(() => {});
const error = jest.spyOn(console, 'error').mockImplementation(() => {});

const Foo = () => <div>Foo</div>;

const FooWithLogger = withLogger(Foo);

const Bar = ({ children, ...rest }) => (
  <div>
    <div>Bar</div>
    <span>Bar</span>
    <FooWithLogger {...getLoggerProps(rest)} />
    {children}
  </div>
);

const BarWithLogger = withLogger(Bar);

const App = ({ text, ...rest }) => (
  <div>
    <BarWithLogger {...getLoggerProps(rest)} />
    <span>App</span>
    <span>{text}</span>
  </div>
);
App.propTypes = {
  text: PropTypes.string,
};

const AppWithLogger = withLogger(App);

beforeEach(() => {
  log.mockReset();
});

describe('logger', () => {
  it('Should render withLogger without errors and log in the console', () => {
    render(<FooWithLogger {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />);
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith('Hello from Foo');
  });
  it('Should render nested components without errors and log in the console', () => {
    const loggerMessage = { [LOGGER_PROPS_NAME]: 'Hello from' };
    render(
      <BarWithLogger {...getLoggerProps(loggerMessage)}>
        <FooWithLogger {...getLoggerProps(loggerMessage)} />
      </BarWithLogger>
    );
    expect(log).toBeCalledTimes(3);
    expect(log).toHaveBeenNthCalledWith(1, 'Hello from Foo');
    expect(log).toHaveBeenNthCalledWith(2, 'Hello from Foo');
    expect(log).toHaveBeenNthCalledWith(3, 'Hello from Bar');
  });
  it('Should be able to pass props to wrapped component', () => {
    const loggerMessage = { [LOGGER_PROPS_NAME]: 'Hello from' };
    const { getByText } = render(<AppWithLogger {...getLoggerProps(loggerMessage)} text='Lorem ipsum' />);
    getByText('Lorem ipsum');
  });
  it('Should show error in the console if  required prop loggerMessage are missing', () => {
    render(<FooWithLogger />);
    expect(error).toBeCalledTimes(1);
  });
});
