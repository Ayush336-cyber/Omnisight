import * as React from 'react';
     import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
     import { cn } from '@/lib/utils';

     const ToggleGroup = ToggleGroupPrimitive.Root;

     const ToggleGroupItem = React.forwardRef<
       React.ElementRef<typeof ToggleGroupPrimitive.Item>,
       React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
     >(({ className, ...props }, ref) => (
       <ToggleGroupPrimitive.Item
         ref={ref}
         className={cn(
           'inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50',
           className
         )}
         {...props}
       />
     ));

     ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

     export { ToggleGroup, ToggleGroupItem };