import type { User } from '../../store/user.store.ts';

const UserCard = ({ user }: { user: User }) => (
  <div className='flex items-center justify-center gap-2.5'>
    <img
      className='h-auto w-10 rounded-full'
      src={user.profile}
      alt={user.name}
    />
    <div className='font-semibold'>{user.name}</div>
  </div>
);

export default UserCard;
