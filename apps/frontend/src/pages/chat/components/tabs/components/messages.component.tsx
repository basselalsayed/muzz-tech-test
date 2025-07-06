import type { Message } from '@muzz/trpc/schema';
import {
  differenceInHours,
  differenceInSeconds,
  format,
  isToday,
  isYesterday,
} from 'date-fns';

import { cn } from '@/lib';

import { MessageItem } from './message-item.component';

interface Props {
  currentUserId: number;
  messages: Message[];
}

const getDateText = (currentTime: Date) => {
  if (isToday(currentTime)) {
    return 'Today';
  } else if (isYesterday(currentTime)) {
    return 'Yesterday';
  } else {
    return format(currentTime, 'MMM d, yyyy');
  }
};

export const Messages: React.FC<Props> = ({ currentUserId, messages }) => (
  <div className='flex flex-col'>
    {messages.map((message, i) => {
      const lastMessage: Message | undefined = messages[i - 1];

      const currentTime = new Date(message.timestamp);
      const prevTime = new Date(lastMessage?.timestamp ?? message.timestamp);
      const diffInHours = differenceInHours(currentTime, prevTime);

      const messageItem = (
        <MessageItem
          isCurrentUser={message.senderId === currentUserId}
          message={message}
        />
      );

      if (diffInHours >= 1) {
        const dateText = getDateText(currentTime);

        return (
          <div key={message.id} className='mt-4 first:mt-0'>
            <div className='my-2 text-center text-xs text-gray-500'>
              <b>{dateText}</b> {format(currentTime, 'h:mm a')}
            </div>
            {messageItem}
          </div>
        );
      }

      const diffInSecs = differenceInSeconds(currentTime, prevTime);
      const lastTwoMessagesFromSameUser =
        lastMessage?.senderId === message.senderId;

      const reducedMargin = diffInSecs < 20 && lastTwoMessagesFromSameUser;

      return (
        <div
          key={message.id}
          className={cn('first:mt-0', reducedMargin ? 'mt-1' : 'mt-4')}
        >
          {messageItem}
        </div>
      );
    })}
  </div>
);
