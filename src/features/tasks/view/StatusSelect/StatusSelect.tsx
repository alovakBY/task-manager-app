import { Button } from '@/shared/view/components/Button/Button';
import { DropdownMenu } from '@/shared/view/components/DropdownMenu/DropdownMenu';

import type { TaskStatusDTO } from '../../api/types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../../model/constants';

type Props = {
   value: TaskStatusDTO;
   onChange: (status: TaskStatusDTO) => void;
};

export const StatusSelect = ({ value, onChange }: Props) => {
   return (
      <DropdownMenu
         trigger={<Button variant={'select'}>{STATUS_LABELS[value]}</Button>}
         items={STATUS_OPTIONS}
         value={value}
         onChange={onChange}
      />
   );
};
