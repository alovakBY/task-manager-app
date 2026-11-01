import { z } from 'zod';

import { TASK_PRIORITY_DTO, TASK_STATUSES_DTO } from '../api/types';

export const taskFormSchema = z.object({
   title: z
      .string()
      .trim()
      .min(1, { message: 'Title is required' })
      .max(120, { message: 'Title must be at most 120 characters' }),
   description: z
      .string()
      .trim()
      .max(1000, { message: 'Description must be at most 1000 characters' }),
   status: z.enum(TASK_STATUSES_DTO),
   priority: z.enum(TASK_PRIORITY_DTO),
   deadline: z.string().refine(
      (value) => {
         if (value === '') return true;

         const now = new Date().getTime();
         const valueParse = Date.parse(value);

         if (Number.isNaN(valueParse)) return false;

         return now < valueParse;
      },
      {
         message: 'Invalid date',
      },
   ),
});

export type TaskFormData = z.input<typeof taskFormSchema>;

export const EMPTY_TASK_FORM: TaskFormData = {
   title: '',
   description: '',
   status: 'new',
   priority: 'medium',
   deadline: '',
};
