import { type FC, type ReactNode } from 'react';
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu';
import cn from 'clsx';

import styles from './DropdownMenu.module.scss';

type Props = {
   value: string;
   trigger: ReactNode;
   items: { value: string; label: ReactNode }[];
   onChange: (value: string) => void;
};

export const DropdownMenu: FC<Props> = ({
   trigger,
   value,
   items,
   onChange,
}) => {
   return (
      <DropdownMenuRadix.Root>
         <DropdownMenuRadix.Trigger asChild>
            <button aria-label="Customise options">{trigger}</button>
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
                        })}
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
