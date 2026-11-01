import { useEffect, useEffectEvent, useState } from 'react';
import cn from 'clsx';

import { Button } from '@/shared/view/components/Button/Button';
import { Input } from '@/shared/view/components/Input/Input';

import { type LoginFormData, loginSchema } from '../../model/loginSchema';

import styles from './LoginForm.module.scss';

type ZodValidationErrors = Partial<Record<keyof LoginFormData, string>>;

type Props = {
   onSubmit: (data: LoginFormData) => void;
   reset: () => void;
   isPending: boolean;
   apiError?: string;
};

export const LoginForm = ({ onSubmit, reset, isPending, apiError }: Props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [errors, setErrors] = useState<ZodValidationErrors>({});

   const onReset = useEffectEvent(() => {
      if (apiError) {
         reset();
      }
   });

   useEffect(() => {
      onReset();
   }, [email, password]);

   const handleSubmit = () => {
      setErrors({});

      const validationResult = loginSchema.safeParse({ email, password });

      if (validationResult.success) {
         onSubmit(validationResult.data);
      } else {
         const formattedErrors =
            validationResult.error.issues.reduce<ZodValidationErrors>(
               (result, issue) => {
                  const fieldName = issue.path[0] as keyof LoginFormData;

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
         <div
            data-testId="apiError"
            className={cn(styles.error, {
               [styles.show]: apiError,
            })}
         >
            {apiError}
         </div>
         <div className={styles.form}>
            <Input
               id="email"
               label="Email"
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
               }}
               error={errors.email}
               disabled={isPending}
            />
            <Input
               id="password"
               label="Password"
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
               }}
               error={errors.password}
               disabled={isPending}
            />
            <Button
               onClick={handleSubmit}
               className={styles.button}
               isLoading={isPending}
            >
               Login
            </Button>
         </div>
      </div>
   );
};
