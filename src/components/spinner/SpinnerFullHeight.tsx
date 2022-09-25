import Spinner from '@app/components/spinner/Spinner';
import withLogger from '@app/utils/logger/withLogger';

const SpinnerFullHeight = () => (
  <div className='min-h-[length:var(--main-layout-height)] min-w-full flex items-center justify-center'>
    <Spinner size={48} />
  </div>
);

export default withLogger(SpinnerFullHeight);
