import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSubscription } from '@trpc/tanstack-react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { match } from 'ts-pattern';
import { z } from 'zod';

import { TypingIndicator } from '@/components';
import { trpc } from '@/data';
import { useCurrentRecipient, useTyping } from '@/hooks';
import { useUserStore } from '@/store';

import { MessagesSkeleton } from './components/messages-skeleton.component.tsx';
import { Messages } from './components/messages.component.tsx';

const messageFormSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').trim(),
});

type MessageFormData = z.infer<typeof messageFormSchema>;

const ChatTab = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const currentRecipient = useCurrentRecipient();

  const chatId = [currentUser.id, currentRecipient?.id ?? 0]
    .sort((a, b) => a - b)
    .join('-');

  const { data: messages, status } = useQuery(
    trpc.chat.getMessages.queryOptions({ chatId })
  );

  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<MessageFormData>({
    mode: 'onChange',
    resolver: zodResolver(messageFormSchema),
  });

  const { isPending, mutate } = useMutation(
    trpc.chat.postMessage.mutationOptions({
      onError: (error) => {
        setError('content', { message: error.message });
      },
      onSuccess: () => {
        reset();
      },
    })
  );

  const { partnerTyping } = useTyping({
    chatId,
    inputRef,
    userId: currentUser.id,
  });

  useSubscription(
    trpc.chat.onMessage.subscriptionOptions(
      { chatId },
      {
        enabled: true,
        onData: (message) => {
          queryClient.setQueryData(
            trpc.chat.getMessages.queryKey({ chatId }),
            (old) => [...(old ?? []), message]
          );
        },
      }
    )
  );

  const onSubmit = ({ content }: MessageFormData) => {
    if (!currentRecipient || isPending) return;

    mutate({
      chatId,
      content,
      recipientId: currentRecipient.id,
      senderId: currentUser.id,
    });
  };

  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='flex max-h-[490px] flex-1 flex-col overflow-auto p-[5px]'>
        {match(status)
          .returnType<React.ReactNode>()
          .with('pending', () => <MessagesSkeleton />)
          .with('success', () => (
            <Messages
              currentUserId={currentUser.id}
              messages={messages ?? []}
            />
          ))
          .with('error', () => <div>Error fetching previous messages</div>)
          .exhaustive()}
        <TypingIndicator
          isVisible={partnerTyping}
          name={currentRecipient?.name ?? ''}
        />
      </div>
      <div className='p-[20px] px-[10px]'>
        <form
          onSubmit={handleSubmit(onSubmit) as VoidFunction}
          className='flex gap-[10px]'
        >
          <div className='flex-1'>
            <input
              {...register('content')}
              ref={(ref) => {
                inputRef.current = ref;
                register('content').ref(ref);
              }}
              type='text'
              placeholder={`Message ${currentRecipient?.name || ''}`}
              className='w-full rounded-full border-[8px] border-[#cfcfcf] px-[12px] py-[8px]'
              disabled={isPending}
            />
            {errors.content && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.content.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={isPending || !isValid}
            className='rounded-full bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300'
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTab;
