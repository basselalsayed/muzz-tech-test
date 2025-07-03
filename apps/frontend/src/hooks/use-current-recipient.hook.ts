import { useParams } from 'react-router';

import { type TUser, useUsers } from '@/data';

export const useCurrentRecipient = (): TUser | undefined => {
  const { userId } = useParams();
  const { data: users } = useUsers();

  if (!userId) {
    throw new Error('No user ID found in params');
  }

  return users?.find((user) => user.id === Number(userId));
};
