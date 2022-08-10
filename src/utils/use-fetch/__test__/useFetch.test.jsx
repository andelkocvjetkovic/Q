import { renderHook, waitFor, act } from '@testing-library/react';
import useFetch from '@app/utils/use-fetch/useFetch';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';
import mockAxios from 'jest-mock-axios';
import mockUsers from '@app/utils/use-fetch/__test__/mockUsers';

afterEach(() => {
  mockAxios.reset();
});

describe('useFetch', () => {
  it('should return loading state on start', () => {
    const { result } = renderHook(() => useFetch('/posts'));
    expect(AsyncDataLeaf.Loading.is(result.current)).toBe(true);
  });
  it('should fetch posts data succesfuly', async () => {
    const { result } = renderHook(() => useFetch('/posts'));
    await waitFor(() => expect(mockAxios.get).toBeCalledTimes(1));

    act(() => mockAxios.mockResponse({ data: mockUsers }));
    expect(AsyncDataLeaf.Success.is(result.current)).toBe(true);

    result.current.cata({
      Loading: () => new Error('never gets here'),
      Success: data => expect(data).toEqual(mockUsers),
      Error: () => new Error('never gets here'),
    });
  });
  it('should have error fetch state', async () => {
    const { result } = renderHook(() => useFetch('/posts'));
    await waitFor(() => expect(mockAxios.get).toBeCalledTimes(1));

    act(() => mockAxios.mockError('Something went wrong!'));
    expect(AsyncDataLeaf.Error.is(result.current)).toBe(true);

    result.current.cata({
      Loading: () => new Error('never gets here'),
      Success: () => new Error('never gets here'),
      Error: e => expect(e).toBe('Something went wrong!'),
    });
  });
});
