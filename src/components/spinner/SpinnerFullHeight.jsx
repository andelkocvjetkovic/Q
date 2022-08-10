import Spinner from '@app/components/spinner/Spinner';
import withLogger, { getLoggerProps } from '@app/utils/logger/withLogger';

const SpinnerFullHeight = props => (
  <div className='min-h-[length:var(--main-layout-height)] min-w-full flex items-center justify-center'>
    <Spinner {...getLoggerProps(props)} size={48} />
  </div>
);

export default withLogger(SpinnerFullHeight);
