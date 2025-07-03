import type { TUser } from '@/data';

export const UserCard: React.FC<{ user: TUser }> = ({ user }) => (
  <div className='flex items-center justify-center gap-2.5'>
    <img
      className='h-auto w-10 rounded-full'
      src={user.profile}
      alt={user.name}
    />
    <div className='font-semibold'>{user.name}</div>
  </div>
);
