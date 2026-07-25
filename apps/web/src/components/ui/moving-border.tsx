'use client';

import { cn } from '@/lib/utils';

export function MovingBorderButton({
  children,
  className,
  containerClassName,
  as: Component = 'button',
  borderRadius = '0.5rem',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: React.ElementType;
  borderRadius?: string;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        'relative inline-flex h-auto overflow-hidden p-[1.5px] group/btn focus:outline-none focus:ring-2 focus:ring-primary/50',
        containerClassName
      )}
      style={{ borderRadius }}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[border-spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--iris)_0%,var(--foam)_25%,var(--gold)_50%,var(--iris)_100%)]" />
      <span
        className={cn(
          'inline-flex h-full w-full items-center justify-center gap-2 bg-background px-5 py-2.5 text-sm font-medium backdrop-blur-3xl transition-colors group-hover/btn:bg-secondary/80',
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} - 1.5px)` }}
      >
        {children}
      </span>
    </Component>
  );
}
