import { useState } from 'react';

import { Button } from '@/shared/view/components/Button/Button';
import { Input } from '@/shared/view/components/Input/Input';
import { TextArea } from '@/shared/view/components/TextArea/TextArea';

import type { TaskDataInput } from '../../api/types';
import {
   EMPTY_TASK_FORM,
   type TaskFormData,
   taskFormSchema,
} from '../../model/taskFormSchema';
import { toDateTimeLocalValue } from '../../model/toDateTimeLocalValue';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';
import { StatusSelect } from '../StatusSelect/StatusSelect';

import styles from './TaskForm.module.scss';

type Props = {
   submitLabel: string;
   defaultValues?: TaskFormData;
   isPending: boolean;
   error?: string;
   onSubmit: (values: TaskDataInput) => void;
};

type ZodValidationErrors = Partial<Record<keyof TaskFormData, string>>;

export const TaskForm = ({
   defaultValues = EMPTY_TASK_FORM,
   submitLabel,
   isPending,
   error,
   onSubmit,
}: Props) => {
   const [values, setValues] = useState<TaskFormData>(defaultValues);
   const [errors, setErrors] = useState<ZodValidationErrors>({});

   const setField = <T extends keyof TaskFormData>(
      field: T,
      value: TaskFormData[T],
   ) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
   };

   const handleSubmit = () => {
      const validationResult = taskFormSchema.safeParse(values);

      if (validationResult.success) {
         onSubmit(validationResult.data);
      } else {
         const formattedErrors =
            validationResult.error.issues.reduce<ZodValidationErrors>(
               (result, issue) => {
                  const fieldName = issue.path[0] as keyof TaskFormData;

                  if (fieldName) {
                     result[fieldName] = issue.message;
                  }

                  return result;
               },
               {},
            );

         setErrors(formattedErrors);
      }
   };

   return (
      <div className={styles.root}>
         <Input
            label="Title"
            placeholder="Title"
            error={errors.title}
            value={values.title}
            onChange={(e) => setField('title', e.target.value)}
         />
         <TextArea
            label="Description"
            placeholder="Description"
            error={errors.description}
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
         />
         <div className={styles.row}>
            <div className={styles.rowItem}>
               <span className={styles.label}>Status</span>
               <StatusSelect
                  value={values.status}
                  onChange={(status) => setField('status', status)}
                  isPending={isPending}
               />
            </div>
            <div className={styles.rowItem}>
               <span className={styles.label}>Priority</span>
               <PrioritySelect
                  value={values.priority}
                  onChange={(priority) => setField('priority', priority)}
               />
            </div>
         </div>
         <Input
            label="Deadline"
            type="datetime-local"
            value={toDateTimeLocalValue(values.deadline)}
            onChange={(e) => setField('deadline', e.target.value)}
            error={errors.deadline}
            disabled={isPending}
         />
         <div>
            {error && (
               <div role="alert" className={styles.error}>
                  {error}
               </div>
            )}
            <Button isLoading={isPending} onClick={handleSubmit}>
               {submitLabel}
            </Button>
         </div>
      </div>
   );
};
