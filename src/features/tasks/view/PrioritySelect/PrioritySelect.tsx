import { Button } from '@/shared/view/components/Button/Button';
import { DropdownMenu } from '@/shared/view/components/DropdownMenu/DropdownMenu';

import type { TaskPriorityDTO } from '../../api/types';
import { PRIORITY_LABELS, PRIORITY_OPTIONS } from '../../model/constants';

type Props = {
   value: TaskPriorityDTO;
   onChange: (status: TaskPriorityDTO) => void;
};

export const PrioritySelect = ({ value, onChange }: Props) => {
   return (
      <DropdownMenu
         trigger={<Button variant={'select'}>{PRIORITY_LABELS[value]}</Button>}
         items={PRIORITY_OPTIONS}
         value={value}
         onChange={onChange}
      />
   );
};
