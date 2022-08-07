import { render } from '@testing-library/react';
import App from '@app/App';

describe('<App />', () => {
  it('Run without errors', () => {
    render(<App />);
  });
});
