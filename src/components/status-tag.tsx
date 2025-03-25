import { cn } from '@/lib/utils';

interface StatusTagProps {
  className?: string;
  text?: string;
}

export function StatusTag({ className, text }: StatusTagProps) {
  return (
    <span
      className={cn(
        cn(
          'rounded-full border px-2.5 py-0.5 text-sm font-bold font-medium',
          className
        )
      )}
    >
      {text}
    </span>
  );
}
