import type { ReactNode } from 'react';
import * as DialogRadix from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { IconButton } from '../IconButton/IconButton';

import styles from './Dialog.module.scss';

type Props = {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   title: string;
   children: ReactNode;
   description?: ReactNode;
};

export const Dialog = ({
   title,
   description,
   children,
   open,
   onOpenChange,
}: Props) => (
   <DialogRadix.Root open={open} onOpenChange={onOpenChange}>
      <DialogRadix.Trigger />
      <DialogRadix.Portal>
         <DialogRadix.Overlay className={styles.overlay} />
         <DialogRadix.Content className={styles.content}>
            <div className={styles.header}>
               <DialogRadix.Title className={styles.title}>
                  {title}
               </DialogRadix.Title>
               <DialogRadix.Close asChild>
                  <IconButton aria-label="Close">
                     <Cross2Icon />
                  </IconButton>
               </DialogRadix.Close>
            </div>
            {description && (
               <DialogRadix.Description>{description}</DialogRadix.Description>
            )}
            {children}
         </DialogRadix.Content>
      </DialogRadix.Portal>
   </DialogRadix.Root>
);
