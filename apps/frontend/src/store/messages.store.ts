import { create } from 'zustand';

export type Message = {
  content: string;
  id: number;
  recipientId: number;
  senderId: number;
  timestamp: string;
};

export type MessageInput = {
  content: string;
  recipientId: number;
  senderId: number;
};

type MessagesState = {
  createMessage: (message: MessageInput) => void;
  messages: Message[];
};

const useMessagesStore = create<MessagesState>()((set) => ({
  createMessage: (message: MessageInput) =>
    set((state) => {
      const newMessage: Message = {
        content: message.content,
        id: state.messages.length + 1,
        recipientId: message.recipientId,
        senderId: message.senderId,
        timestamp: new Date().toISOString(),
      };
      return { messages: [...state.messages, newMessage] };
    }),
  messages: [],
}));

export default useMessagesStore;
