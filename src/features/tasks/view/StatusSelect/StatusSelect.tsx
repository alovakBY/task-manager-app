import { Button } from '@/shared/view/components/Button/Button';
import { DropdownMenu } from '@/shared/view/components/DropdownMenu/DropdownMenu';

import type { TaskStatusDTO } from '../../api/types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../../model/constants';

type Props = {
   value: TaskStatusDTO;
   isPending: boolean;
   onChange: (status: TaskStatusDTO) => void;
};

export const StatusSelect = ({ value, isPending, onChange }: Props) => {
   return (
      <DropdownMenu
         disabled={isPending}
         trigger={
            <Button
               disabled={isPending}
               variant={'select'}
               data-testId="status-select"
               aria-label={STATUS_LABELS[value]}
            >
               {STATUS_LABELS[value]}
            </Button>
         }
         items={STATUS_OPTIONS}
         value={value}
         onChange={onChange}
      />
   );
};
