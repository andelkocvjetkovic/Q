import useFetchCached from '@app/utils/use-fetch/useFetchCached';
import { waitFor, renderHook, act } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import mockUsers from '@app/utils/use-fetch/__test__/mockUsers';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';

const CacheSet = jest.spyOn(Map.prototype, 'set');
const CacheGet = jest.spyOn(Map.prototype, 'get');

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe('useFetchCached', () => {
  it('should put in cache and read from it', async () => {
    const user1 = mockUsers.find(u => u.id === 1);
    const user2 = mockUsers.find(u => u.id === 2);
    const { result, rerender } = renderHook(key => useFetchCached(key), { initialProps: 'users/1' });
    await waitFor(() => expect(mockAxios.get).toBeCalledTimes(1));

    act(() => mockAxios.mockResponse({ data: user1 }));
    expect(AsyncDataLeaf.Success.is(result.current)).toBe(true);
    result.current.cata({
      Loading: () => new Error('never gets here'),
      Success: data => {
        expect(CacheSet).toBeCalledTimes(1);
        expect(CacheSet).toBeCalledWith(JSON.stringify('users/1'), user1);
        expect(data).toEqual(user1);
      },
      Error: () => new Error('never gets here'),
    });

    rerender('users/2');
    await waitFor(() => expect(mockAxios.get).toBeCalledTimes(2));
    act(() => mockAxios.mockResponse({ data: user2 }));
    expect(AsyncDataLeaf.Success.is(result.current)).toBe(true);
    result.current.cata({
      Loading: () => new Error('never gets here'),
      Success: data => {
        expect(CacheSet).toBeCalledTimes(2);
        expect(CacheSet).toBeCalledWith(JSON.stringify('users/2'), user2);
        expect(data).toEqual(user2);
      },
      Error: () => new Error('never gets here'),
    });

    rerender('users/1');
    expect(mockAxios.get).toBeCalledTimes(2);
    expect(AsyncDataLeaf.Success.is(result.current)).toBe(true);
    result.current.cata({
      Loading: () => new Error('never gets here'),
      Success: data => {
        expect(CacheSet).toBeCalledTimes(2);
        expect(CacheGet).toBeCalledTimes(1);
        expect(data).toEqual(user1);
      },
      Error: () => new Error('never gets here'),
    });
  });
  it('should have error fetch state', async () => {
    const { result } = renderHook(() => useFetchCached('users/3'));
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
