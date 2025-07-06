import { useNavigate } from 'react-router';

import { Button, UserCard } from '@/components';
import { useUsers } from '@/data';
import { ROUTES } from '@/lib';
import { useUserStore } from '@/store';

const UserList = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const navigate = useNavigate();

  const { data: users } = useUsers();

  const switchUser = (userId: number) => {
    const user = users?.find((user) => user.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const messageUser = (userId: number) => {
    const user = users?.find((user) => user.id === userId);
    if (user) {
      void navigate(ROUTES.chat({ userId }));
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
