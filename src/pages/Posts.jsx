import usePosts from '@app/utils/use-fetch/usePosts';

const Posts = () => {
  const posts = usePosts();
  console.log(posts.toString());
  return posts.cata({
    Loading: () => <div>Loading ...</div>,
    Success: data => (
      <div className='grid grid-cols-2 gap-4'>
        {data.map(p => (
          <div key={p.id}>
            <div>{p.title}</div>
            <div>{p.userId}</div>
            <div>{p.body}</div>
          </div>
        ))}
      </div>
    ),
    Error: error => <div>Something went wrong! {error.message}</div>,
  });
  return <div>Posts</div>;
};

export default Posts;
