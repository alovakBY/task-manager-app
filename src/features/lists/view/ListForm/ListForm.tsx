import { useState } from 'react';

import { Button } from '@/shared/view/components/Button/Button';
import { Input } from '@/shared/view/components/Input/Input';

import { type ListFormData, listFormSchema } from '../../model/listFormSchema';

import styles from './ListForm.module.scss';

type Props = {
   submitLabel: string;
   defaultValue?: string;
   isPending: boolean;
   error?: string;
   onSubmit: (value: string) => void;
};

type ZodValidationErrors = Partial<Record<keyof ListFormData, string>>;

export const ListForm = ({
   defaultValue = '',
   submitLabel,
   isPending,
   error,
   onSubmit,
}: Props) => {
   const [value, setValue] = useState(defaultValue);
   const [inputError, setInputError] = useState<ZodValidationErrors>({});

   const handleSubmit = () => {
      const validationResult = listFormSchema.safeParse({ name: value });

      if (validationResult.success) {
         onSubmit(value);
      } else {
         const formattedErrors =
            validationResult.error.issues.reduce<ZodValidationErrors>(
               (result, issue) => {
                  const fieldName = issue.path[0] as keyof ListFormData;

                  if (fieldName) {
                     result[fieldName] = issue.message;
                  }

                  return result;
               },
               {},
            );

         setInputError(formattedErrors);
      }
   };

   return (
      <div className={styles.root}>
         <Input
            label="List name"
            placeholder="List name"
            error={inputError.name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
