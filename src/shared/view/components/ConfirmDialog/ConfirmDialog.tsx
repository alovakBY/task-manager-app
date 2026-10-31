import type { ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Dialog } from '../Dialog/Dialog';

import styles from './ConfirmDialog.module.scss';

type Props = {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   title: string;
   message: ReactNode;
   confirmLabel?: string;
   isPending?: boolean;
   error?: string;
   onConfirm: () => void;
};

export const ConfirmDialog = ({
   open,
   onOpenChange,
   title,
   message,
   confirmLabel = 'Delete',
   isPending = false,
   error,
   onConfirm,
}: Props) => {
   return (
      <Dialog
         open={open}
         onOpenChange={onOpenChange}
         title={title}
         description={message}
      >
         {error && (
            <div role="alert" className={styles.error}>
               {error}
            </div>
         )}
         <div className={styles.actions}>
            <Button
               variant="secondary"
               onClick={() => onOpenChange(false)}
               disabled={isPending}
            >
               Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm} isLoading={isPending}>
               {confirmLabel}
            </Button>
         </div>
      </Dialog>
   );
};
