import PropTypes from 'prop-types';
import * as R from 'ramda';
import { useRef, useEffect } from 'react';

export const LOGGER_PROPS_NAME = 'loggerMessage';

export const useLogger = (message, name) => {
  const isLogged = useRef(false);

  useEffect(() => {
    // since react 18.+ useEffect runs twice on component mount https://github.com/facebook/react/issues/24502
    if (!isLogged.current) {
      console.log(`${message} ${name}`);
      isLogged.current = true;
    }
  }, [name, message]);
};

// getLoggerMessage :: Object -> String
const getLoggerMessage = R.prop(LOGGER_PROPS_NAME);

// prettier-ignore
// getComponentName :: Object -> String
const getComponentName = Component => 
  'displayName' in Component 
    ? R.prop('displayName', Component)
    : R.prop('name', Component);

// getLoggerProps :: Object -> {loggerMessage: String}
export const getLoggerProps = props => ({ [LOGGER_PROPS_NAME]: getLoggerMessage(props) });

const withLogger = Component => {
  const Logger = props => {
    useLogger(getLoggerMessage(props), getComponentName(Component));

    return <Component {...props} />;
  };

  Logger.propTypes = {
    [LOGGER_PROPS_NAME]: PropTypes.string.isRequired,
  };

  Logger.displayName = `WithLogger(${getComponentName(Component)})`;

  return Logger;
};

export default withLogger;
