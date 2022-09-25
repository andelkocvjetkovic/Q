import PropTypes from 'prop-types';
import { prop } from 'ramda';
import { useRef, useEffect } from 'react';

type DisplayName = {
  displayName: string;
};
type Name = {
  name: string;
};

export const LOGGER_PROPS_NAME = 'loggerMessage';
const LOGGER_MESSAGE = 'Hello from';

export const useLogger = (message: string, name: string): void => {
  const isLogged = useRef(false);

  useEffect(() => {
    // since react 18.+ useEffect runs twice on component mount https://github.com/facebook/react/issues/24502
    if (!isLogged.current) {
      console.log(`${message} ${name}`);
      isLogged.current = true;
    }
  }, [name, message]);
};

// prettier-ignore
// getComponentName :: Object -> String
const getComponentName: (Component: DisplayName | Name) => string = Component =>
  'displayName' in Component
    ? prop('displayName', Component)
    : prop('name', Component);

const withLogger = <T extends object>(Component: React.ComponentType<T>) => {
  const Logger = (props: T) => {
    useLogger(LOGGER_MESSAGE, getComponentName(Component));

    return <Component {...props} />;
  };

  Logger.displayName = `WithLogger(${getComponentName(Component)})`;

  return Logger;
};

export default withLogger;
