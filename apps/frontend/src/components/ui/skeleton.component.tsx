import { cn } from '@/lib';

interface Props {
  className?: string;
}

export const Skeleton: React.FC<Props> = ({ className }) => (
  <div
    className={cn(
      'animate-pulse rounded-md bg-gray-200',
      'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
      'relative overflow-hidden',
      className
    )}
  />
);
