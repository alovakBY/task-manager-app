import { Button } from '@/shared/view/components/Button/Button';
import { DropdownMenu } from '@/shared/view/components/DropdownMenu/DropdownMenu';

import type { TaskStatusDTO } from '../../api/types';
import { STATUS_LABELS, STATUS_OPTIONS } from '../../model/constants';

import styles from './StatusFilter.module.scss';

type FilterValue = TaskStatusDTO | null;

const FILTERS: { value: FilterValue; label: string }[] = [
   { value: null, label: 'All' },
   ...STATUS_OPTIONS,
];

type Props = {
   value: FilterValue;
   onChange: (status: FilterValue) => void;
};

export const StatusFilter = ({ value, onChange }: Props) => {
   return (
      <div className={styles.root}>
         <span className={styles.label}>Filtred by status:</span>
         <DropdownMenu
            trigger={
               <Button variant={'secondary'} className={styles.trigger}>
                  {value ? STATUS_LABELS[value] : 'All'}
               </Button>
            }
            items={FILTERS}
            value={value}
            onChange={onChange}
         />
      </div>
   );
};
