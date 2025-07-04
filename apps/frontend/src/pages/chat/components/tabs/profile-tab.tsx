import { UserCard } from '@/components';
import { useCurrentRecipient } from '@/hooks';

const ProfileTab = () => {
  const currentRecipient = useCurrentRecipient();

  return (
    <div className='flex flex-col gap-4 py-7 text-center'>
      {currentRecipient && <UserCard user={currentRecipient} />}
      <p>This tab is a placeholder - no improvements are needed.</p>
    </div>
  );
};

export default ProfileTab;
