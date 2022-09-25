import useFetch from '@app/utils/use-fetch/useFetch';
import { Comment } from '@app/utils/types';

const useComments = (postId: number) => useFetch<Comment[]>(`posts/${postId}/comments`);

export default useComments;
