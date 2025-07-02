import { useQuery } from '@tanstack/react-query';

import Button from '@/components/button/Button';
import UserCard from '@/components/user-card/UserCard';

import usePageStore from '@/store/page.store';
import useUserStore, { type User } from '@/store/user.store';

const UserList = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setCurrentRecipient = useUserStore(
    (state) => state.setCurrentRecipient
  );
  const setCurrentPage = usePageStore((state) => state.setCurrentPage);

  const { data: users } = useQuery<User[]>({
    queryFn: async () => fetch('/api/user/all.json').then((res) => res.json()),
    queryKey: ['users'],
  });

  const switchUser = (userId: number) => {
    const user = users?.find((user) => user.id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentRecipient(undefined);
    }
  };

  const messageUser = (userId: number) => {
    const user = users?.find((user) => user.id === userId);
    if (user) {
      setCurrentRecipient(user);
      setCurrentPage('chat');
    }
  };

  return (
    <div className='flex flex-col gap-8 md:flex-row'>
      <div className='flex-1'>
        <h2 className='mb-4 text-lg font-semibold'>Select Current User</h2>
        <div className='flex flex-col gap-2.5'>
          {users?.map((user) => (
            <div className='flex items-center' key={user.id}>
              <UserCard user={user} />
              <div className='ml-auto'>
                <Button
                  onClick={() => switchUser(user.id)}
                  disabled={user.id === currentUser.id}
                >
                  {user.id === currentUser.id ? 'Current User' : 'Switch to'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex-1'>
        <h2 className='mb-4 text-lg font-semibold'>Message Someone</h2>
        <div className='flex flex-col gap-2.5'>
          {users?.map((user) => (
            <div className='flex items-center' key={user.id}>
              <UserCard user={user} />
              <div className='ml-auto'>
                <Button
                  onClick={() => messageUser(user.id)}
                  disabled={user.id === currentUser.id}
                >
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
