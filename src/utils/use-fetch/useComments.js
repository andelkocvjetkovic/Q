import useFetch from '@app/utils/use-fetch/useFetch';

const useComments = postId => useFetch(`posts/${postId}/comments`);

export default useComments;
