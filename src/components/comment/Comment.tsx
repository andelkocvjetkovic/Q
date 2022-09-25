import withLogger from '@app/utils/logger/withLogger';

type Props = {
  email: string;
  name: string;
  body: string;
};

const Comment = ({ email, name, body }: Props) => {
  return (
    <section className='flex flex-col gap-1 border p-2'>
      <div className='text-gray-500 text-sm'>Email: {email}</div>
      <div className='text-gray-500 text-sm'>Name: {name}</div>
      <div className='text-gray-800 text-sm break-words'>Body: {body}</div>
    </section>
  );
};

export default withLogger(Comment);
