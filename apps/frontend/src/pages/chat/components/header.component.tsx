import { ChevronLeft, Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router';

import { UserCard } from '@/components';
import { useCurrentRecipient } from '@/hooks';
import { ROUTES } from '@/lib';
import { useUserStore } from '@/store';

const Header = () => {
  const navigate = useNavigate();
  const currentRecipient = useCurrentRecipient();
  const currentUser = useUserStore((state) => state.currentUser);

  if (!currentRecipient || !currentUser) {
    return;
  }

  return (
    <div className='flex justify-between p-[20px]'>
      <ChevronLeft
        onClick={() => void navigate(ROUTES.home())}
        className='cursor-pointer'
      />
      <UserCard user={currentRecipient} />
      {/* Doesn't need to do anything */}
      <Ellipsis className='cursor-pointer' />
    </div>
  );
};

export default Header;
