import userEvent from '@testing-library/user-event';
import { render, act } from '@testing-library/react';
import PostsList from '@app/pages/posts/partial/PostsList';
import { getLoggerProps, LOGGER_PROPS_NAME } from '@app/utils/logger/withLogger';
import mockPosts from '@app/utils/use-fetch/__test__/mockPosts';
import mockUsers from '@app/utils/use-fetch/__test__/mockUsers';
import mockAxios from 'jest-mock-axios';
import { UserContext } from '@app/utils/use-fetch/useUsers';
import AsyncDataLeaf from '@app/utils/use-fetch/asyncDataLeaf';
import { useSearchParams, MemoryRouter, Routes, Route } from 'react-router-dom';

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
        <UserContext.Provider value={users}>
          <PostsList list={mockPosts} {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });
  it('Should be able to query posts and update search params with userIds', async () => {
    const ShowParams = () => {
      let [searchParams] = useSearchParams();
      const userIds = searchParams.getAll('userId');
      return <div data-testid='search-params'>{JSON.stringify(userIds)}</div>;
    };
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path='posts'
            element={
              <UserContext.Provider value={users}>
                <ShowParams />
                <PostsList list={mockPosts} {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const searchEl = getByLabelText(/search by username/i);
    const searchParams = getByTestId('search-params');

    await user.click(searchEl);
    await user.keyboard('Leanne');
    act(() => jest.runOnlyPendingTimers());
    expect(searchParams).toHaveTextContent(JSON.stringify(['1']));

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    await user.keyboard('DuBuque');
    act(() => jest.runOnlyPendingTimers());
    expect(searchParams).toHaveTextContent(JSON.stringify(['10']));

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    await user.keyboard('an');
    act(() => jest.runOnlyPendingTimers());
    expect(searchParams).toHaveTextContent(JSON.stringify(['1', '8']));
  });
  it('should give no-found result if no match in users list and deleting query will delete query params by userIds', async () => {
    const ShowParams = () => {
      let [searchParams] = useSearchParams();
      const userId = searchParams.get('userId');
      return <div data-testid='search-params'>{userId}</div>;
    };
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter initialEntries={['/posts']}>
        <Routes>
          <Route
            path='posts'
            element={
              <UserContext.Provider value={users}>
                <ShowParams />
                <PostsList list={mockPosts} {...getLoggerProps({ [LOGGER_PROPS_NAME]: 'Hello from' })} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const searchEl = getByLabelText(/search by username/i);
    const searchParams = getByTestId('search-params');

    await user.click(searchEl);
    await user.keyboard('helloworld');
    act(() => jest.runOnlyPendingTimers());
    expect(searchParams).toHaveTextContent('not-found');

    await user.click(searchEl);
    await user.keyboard('{Control>}[KeyA]{/Control}{Backspace}');
    act(() => jest.runOnlyPendingTimers());
    expect(searchParams).toBeEmptyDOMElement('');
  });
});
