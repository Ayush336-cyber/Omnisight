import * as React from 'react';
     import * as ProgressPrimitive from '@radix-ui/react-progress';
     import { cn } from '@/lib/utils';

     const Progress = React.forwardRef<
       React.ElementRef<typeof ProgressPrimitive.Root>,
       React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
     >(({ className, ...props }, ref) => (
       <ProgressPrimitive.Root
         ref={ref}
         className={cn('relative w-full overflow-hidden rounded-lg bg-muted', className)}
         {...props}
       />
     ));

     Progress.displayName = ProgressPrimitive.Root.displayName;

     const ProgressIndicator = React.forwardRef<
       React.ElementRef<typeof ProgressPrimitive.Indicator>,
       React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
     >(({ className, ...props }, ref) => (
       <ProgressPrimitive.Indicator
         ref={ref}
         className={cn('h-full bg-primary transition-all', className)}
         {...props}
       />
     ));

     ProgressIndicator.displayName = ProgressPrimitive.Indicator.displayName;

     export { Progress, ProgressIndicator };