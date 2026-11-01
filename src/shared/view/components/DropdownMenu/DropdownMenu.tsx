import { type ReactNode } from 'react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import cn from 'clsx';

import styles from './DropdownMenu.module.scss';

type Props = {
   value: string;
   trigger: ReactNode;
   items: { value: string; label: ReactNode }[];
   onChange: (value: string) => void;
   disabled?: boolean;
};

export const DropdownMenu = ({
   trigger,
   value,
   items,
   disabled = false,
   onChange,
}: Props) => {
   return (
      <DropdownMenuRadix.Root>
         <DropdownMenuRadix.Trigger asChild disabled={disabled}>
            {trigger}
         </DropdownMenuRadix.Trigger>

         <DropdownMenuRadix.Portal>
            <DropdownMenuRadix.Content
               sideOffset={5}
               className={styles.content}
            >
               {items.map((item) => {
                  return (
                     <DropdownMenuRadix.Item
                        key={item.value}
                        onClick={() => onChange(item.value)}
                        className={cn(styles.item, {
                           [styles.active]: item.value === value,
                           [styles.disabled]: disabled,
                        })}
                        disabled={disabled}
                     >
                        {item.label}
                     </DropdownMenuRadix.Item>
                  );
               })}
            </DropdownMenuRadix.Content>
         </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
   );
};
