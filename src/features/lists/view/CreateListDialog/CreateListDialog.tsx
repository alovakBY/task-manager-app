import { Dialog } from '@/shared/view/components/Dialog/Dialog';

import { useAddList } from '../../api/useAddList';
import { ListForm } from '../ListForm/ListForm';

type Props = {
   open: boolean;
   onClose: () => void;
};

export const CreateListDialog = ({ open, onClose }: Props) => {
   const { mutate, isPending, error } = useAddList();

   const handleSubmit = (value: string) => {
      mutate({ name: value }, { onSuccess: onClose });
   };

   return (
      <Dialog open={open} onOpenChange={onClose} title={'Create list'}>
         <ListForm
            error={error?.message}
            submitLabel={'Create list'}
            isPending={isPending}
            onSubmit={handleSubmit}
         />
      </Dialog>
   );
};
