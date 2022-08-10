import { renderHook } from '@testing-library/react';
import useDebounce from '@app/utils/use-debounce/useDebounce';

jest.useFakeTimers();
const dbFunction = jest.fn();

afterEach(() => {
  dbFunction.mockReset();
});

describe('useDebounce', () => {
  it('Should use it without errors', () => {
    renderHook(fn => useDebounce(fn), { initialProps: dbFunction });
  });
  it('Should debounce fn calls', () => {
    const { result } = renderHook(fn => useDebounce(fn), { initialProps: dbFunction });
    result.current();
    result.current();
    result.current();
    result.current();
    expect(dbFunction).toBeCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(dbFunction).toBeCalledTimes(1);
  });
  it('Should be able to use custom delay', () => {
    const { result } = renderHook(fn => useDebounce(fn, 500), { initialProps: dbFunction });
    result.current();
    result.current();
    result.current();
    result.current();
    jest.advanceTimersByTime(499);
    expect(dbFunction).toBeCalledTimes(0);
    jest.advanceTimersByTime(1);
    expect(dbFunction).toBeCalledTimes(1);
  });
});
