import { useEffect, useEffectEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'clsx';

import { Button } from '@/shared/view/components/Button/Button';
import { Input } from '@/shared/view/components/Input/Input';

import { useLogin } from '../../api/useLogin';
import { type LoginFormData, loginSchema } from '../../model/loginSchema';

import styles from './LoginForm.module.scss';

type ZodValidationErrors = Partial<Record<keyof LoginFormData, string>>;

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<ZodValidationErrors>({});

  const { mutate, isPending, error: apiError, reset } = useLogin();

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
      mutate(validationResult.data, {
        onSuccess: () => navigate('/lists'),
      });
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
        className={cn(styles.error, {
          [styles.show]: apiError,
        })}
      >
        {apiError?.response?.data?.message || 'Something went wrong'}
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        disabled={isPending}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
  );
};
