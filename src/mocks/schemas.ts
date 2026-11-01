import z from 'zod';

import { TASK_STATUSES_DTO } from '@/features/tasks/api/types';

export const taskStatusSchema = z.enum(TASK_STATUSES_DTO);
