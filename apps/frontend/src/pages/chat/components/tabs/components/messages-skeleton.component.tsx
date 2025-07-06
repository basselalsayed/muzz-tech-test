import { P, match } from 'ts-pattern';

import { Skeleton } from '@/components';
import { cn } from '@/lib';

export const MessagesSkeleton: React.FC = () => {
  const skeletonMessages = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className='flex flex-col gap-2'>
      {skeletonMessages.map((_, i) => {
        const isCurrentUser = Math.random() > 0.5;
        const width = match(Math.random())
          .with(P.number.gt(0.75), () => 'w-1/4')
          .with(P.number.gt(0.5), () => 'w-2/5')
          .with(P.number.gt(0.25), () => 'w-3/5')
          .otherwise(() => 'w-4/5');

        return (
          <div
            key={i}
            className={cn(
              'max-w-4/5 rounded-lg p-2 text-sm sm:max-w-3/5',
              width,
              isCurrentUser ? 'self-end' : 'self-start'
            )}
          >
            <Skeleton className='h-6 w-full' />
          </div>
        );
      })}
    </div>
  );
};
