import type { Message } from '../../../../../../store/messages.store.ts';

type MessageProps = {
  message: Message;
};

const MessageItem = ({ message }: MessageProps) => (
  <div className='m-[8px] rounded-lg bg-amber-50 px-[10px] py-[4px] text-sm'>
    {message.content}
  </div>
);

export default MessageItem;
