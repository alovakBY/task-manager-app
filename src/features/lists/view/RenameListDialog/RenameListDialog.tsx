import { Dialog } from '@/shared/view/components/Dialog/Dialog';

import type { ListDTO } from '../../api/types';
import { useRenameList } from '../../api/useRenameList';
import { ListForm } from '../ListForm/ListForm';

type Props = {
   renamedList: ListDTO | null;
   onClose: () => void;
};
export const RenameListDialog = ({ renamedList, onClose }: Props) => {
   const { mutate, isPending, error } = useRenameList();

   if (!renamedList) {
      return null;
   }

   const handleSubmit = (value: string) => {
      mutate({ id: renamedList.id, name: value }, { onSuccess: onClose });
   };

   return (
      <Dialog
         open={Boolean(renamedList)}
         onOpenChange={onClose}
         title={'Rename list'}
      >
         <ListForm
            error={error?.message}
            submitLabel={'Rename'}
            onSubmit={handleSubmit}
            isPending={isPending}
            defaultValue={renamedList?.name}
         />
      </Dialog>
   );
};
