import type { Message } from '@muzz/trpc/schema';

import { cn } from '@/lib';

interface Props {
  isCurrentUser: boolean;
  message: Message;
}

export const MessageItem: React.FC<Props> = ({ isCurrentUser, message }) => (
  <div
    className={cn(
      'max-w-4/5 rounded-lg p-2 text-sm sm:max-w-3/5',
      isCurrentUser
        ? 'justify-self-end bg-primary'
        : 'justify-self-start bg-amber-50'
    )}
  >
    {message.content}
  </div>
);
