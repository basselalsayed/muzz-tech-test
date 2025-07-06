import { cn } from '@/lib';

interface TypingIndicatorProps {
  className?: string;
  isVisible: boolean;
  name: string;
}

export const TypingIndicator = ({
  className,
  isVisible,
  name,
}: TypingIndicatorProps) => {
  if (!isVisible) return <div className='min-h-9' />;

  return (
    <div
      className={cn(
        'flex items-center gap-1 p-2 text-sm text-gray-500',
        className
      )}
    >
      <div className='flex gap-1'>
        <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]' />
        <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]' />
        <div className='h-2 w-2 animate-bounce rounded-full bg-gray-400' />
      </div>
      <span>{name} is typing...</span>
    </div>
  );
};
