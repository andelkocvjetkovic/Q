import { render } from '@testing-library/react';
import withLogger, { LoggerContext } from '@app/utils/logger/withLogger';
import PropTypes from 'prop-types';

const log = jest.spyOn(console, 'log').mockImplementation(() => {});
const error = jest.spyOn(console, 'error').mockImplementation(() => {});

const Foo = () => <div>Foo</div>;

const FooWithLogger = withLogger(Foo);

const Bar = ({ children }) => (
  <div>
    <div>Bar</div>
    <span>Bar</span>
    <FooWithLogger />
    {children}
  </div>
);

const BarWithLogger = withLogger(Bar);

const App = ({ text }) => (
  <LoggerContext.Provider value='Hello from'>
    <div>
      <BarWithLogger />
      <span>App</span>
      <span>{text}</span>
    </div>
  </LoggerContext.Provider>
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
    render(
      <LoggerContext.Provider value='Hello from'>
        <FooWithLogger />
      </LoggerContext.Provider>
    );
    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith('Hello from Foo');
  });
  it('Should render nested components without errors and log in the console', () => {
    render(
      <LoggerContext.Provider value='Hello from'>
        <BarWithLogger>
          <FooWithLogger />
        </BarWithLogger>
      </LoggerContext.Provider>
    );
    expect(log).toBeCalledTimes(3);
    expect(log).toHaveBeenNthCalledWith(1, 'Hello from Foo');
    expect(log).toHaveBeenNthCalledWith(2, 'Hello from Foo');
    expect(log).toHaveBeenNthCalledWith(3, 'Hello from Bar');
  });
  it('Should be able to pass props to wrapped component', () => {
    const { getByText } = render(<AppWithLogger text='Lorem ipsum' />);
    getByText('Lorem ipsum');
  });
  it('Should show error in the console if logger context value is missing', () => {
    render(
      <LoggerContext.Provider>
        <FooWithLogger />
      </LoggerContext.Provider>
    );
    expect(error).toBeCalledTimes(1);
  });
});
