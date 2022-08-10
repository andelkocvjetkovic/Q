import userEvent from '@testing-library/user-event';
import { render, act, waitFor } from '@testing-library/react';
import PostsList from '@app/pages/posts/partial/PostsList';
import Posts from '@app/pages/posts/Posts';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';
import mockPosts from '@app/utils/use-fetch/__test__/mockPosts';
import mockUsers from '@app/utils/use-fetch/__test__/mockUsers';
import mockAxios from 'jest-mock-axios';
import { UserContext } from '@app/utils/use-fetch/useUsers';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

jest.useFakeTimers();
const log = jest.spyOn(console, 'log').mockImplementation(() => {});

beforeEach(() => {
  log.mockReset();
  mockAxios.reset();
});

const users = AsyncDataLeaf.Success(mockUsers);

describe('<PostsList />', () => {
  it('Should render without error', () => {
    render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path='posts'
            element={
              <UserContext.Provider value={users}>
                <Posts list={mockPosts} {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  });
  it('Should be able to query posts by user fullname', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path='posts'
            element={
              <UserContext.Provider value={users}>
                <Posts {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const searchEl = getByLabelText(/search by user/i);

    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts' }, { data: mockPosts }));

    await user.click(searchEl);
    await user.keyboard('Leanne');
    act(() => jest.runOnlyPendingTimers());
    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts?userId=1', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts?userId=1' }, { data: mockPosts }));

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    await user.keyboard('DuBuque');
    act(() => jest.runOnlyPendingTimers());
    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts?userId=10', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts?userId=10' }, { data: mockPosts }));

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    await user.keyboard('an');
    act(() => jest.runOnlyPendingTimers());
    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts?userId=1&userId=8', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts?userId=1&userId=8' }, { data: mockPosts }));
  });
  it.skip('should give no-found result if no match in users list and deleting query will delete query params by userIds', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByLabelText } = render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path='posts'
            element={
              <UserContext.Provider value={users}>
                <PostsList list={mockPosts} {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const searchEl = getByLabelText(/search by user/i);

    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts' }, { data: mockPosts }));

    await user.click(searchEl);
    await user.keyboard('helloworld');
    act(() => jest.runOnlyPendingTimers());
    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts?userId=not-found', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts?userId=not-found' }, { data: [] }));

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    act(() => jest.runOnlyPendingTimers());
    await waitFor(() => expect(mockAxios.get).toBeCalledWith('/posts', expect.anything()));
    act(() => mockAxios.mockResponseFor({ url: '/posts' }, { data: mockPosts }));
  });
});
