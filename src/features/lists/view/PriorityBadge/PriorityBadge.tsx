import type { TaskPriorityDTO } from '@/features/tasks/api/types';
import { PRIORITY_LABELS } from '@/features/tasks/model/constants';
import { Badge, type BadgeTone } from '@/shared/view/components/Badge/Badge';

const PRIORITY_TONES: Record<TaskPriorityDTO, BadgeTone> = {
   high: 'danger',
   medium: 'warning',
   low: 'neutral',
};

type Props = {
   priority: TaskPriorityDTO;
};

export const PriorityBadge = ({ priority }: Props) => {
   return (
      <Badge tone={PRIORITY_TONES[priority]}>{PRIORITY_LABELS[priority]}</Badge>
   );
};
