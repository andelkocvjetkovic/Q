import useFetch from '@app/utils/use-fetch/useFetch';
const usePosts = () => useFetch('/posts');

export default usePosts;
