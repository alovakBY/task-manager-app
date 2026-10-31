import { z } from 'zod';

export const listFormSchema = z.object({
   name: z
      .string()
      .trim()
      .min(1, { message: 'List name is required' })
      .max(60, { message: 'List name must be at most 60 characters' }),
});

export type ListFormData = z.input<typeof listFormSchema>;
