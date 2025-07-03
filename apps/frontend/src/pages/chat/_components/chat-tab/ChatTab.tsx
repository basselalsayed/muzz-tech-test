import { useState } from 'react';

import { useCurrentRecipient } from '@/hooks';
import useMessagesStore from '@/store/messages.store.ts';
import useUserStore from '@/store/user.store.ts';

import MessageItem from './_components/message/MessageItem.tsx';

const ChatTab = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const currentUser = useUserStore((state) => state.currentUser);
  const currentRecipient = useCurrentRecipient();
  const messages = useMessagesStore((state) => state.messages);

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentRecipient || !currentMessage.trim()) return;

    const newMessage = {
      content: currentMessage.trim(),
      recipientId: currentRecipient.id,
      senderId: currentUser.id,
    };

    setCurrentMessage('');
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex max-h-[490px] flex-1 flex-col overflow-auto p-[5px]'>
        <div className='mt-auto'>
          {messages.map((message) => (
            <div key={message.timestamp}>
              <MessageItem message={message} key={message.id} />
            </div>
          ))}
        </div>
      </div>
      <div className='p-[20px] px-[10px]'>
        <form
          onSubmit={(e) => handleMessageSend(e)}
          className='flex gap-[10px]'
        >
          <input
            type='text'
            placeholder={`Message ${currentRecipient?.name || ''}`}
            className='flex-1 rounded-full border-[8px] border-[#cfcfcf] px-[12px] py-[8px]'
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatTab;
