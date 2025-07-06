import { useMutation } from '@tanstack/react-query';
import { useSubscription } from '@trpc/tanstack-react-query';
import { useCallback, useRef } from 'react';
import { useBoolean, useDebounceCallback, useEventListener } from 'usehooks-ts';

import { trpc } from '@/data';

interface UseTypingOptions {
  chatId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  userId: number;
}

export const useTyping = ({ chatId, inputRef, userId }: UseTypingOptions) => {
  const { setFalse, setTrue, value: partnerTyping } = useBoolean();

  const startTypingMutation = useMutation(
    trpc.chat.startTyping.mutationOptions()
  );
  const stopTypingMutation = useMutation(
    trpc.chat.stopTyping.mutationOptions()
  );

  useSubscription(
    trpc.chat.onTypingStarted.subscriptionOptions(
      { chatId },
      {
        enabled: true,
        onData: (data) => {
          if (data.userId !== userId) {
            setTrue();
          }
        },
      }
    )
  );

  useSubscription(
    trpc.chat.onTypingStopped.subscriptionOptions(
      { chatId },
      {
        enabled: true,
        onData: (data) => {
          if (data.userId !== userId) {
            setFalse();
          }
        },
      }
    )
  );

  const handleStopTyping = useCallback(() => {
    stopTypingMutation.mutate({ chatId, userId });
  }, [chatId, stopTypingMutation, userId]);

  const typingTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const handleTyping = useDebounceCallback(() => {
    clearTimeout(typingTimeoutRef.current);

    startTypingMutation.mutate({ chatId, userId });

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  }, 300);

  useEventListener(
    'input',
    handleTyping,
    inputRef as React.RefObject<HTMLInputElement>
  );

  useEventListener(
    'blur',
    handleStopTyping,
    inputRef as React.RefObject<HTMLInputElement>
  );

  return {
    partnerTyping,
  };
};
