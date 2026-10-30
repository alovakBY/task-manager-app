import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export const Input = ({ label, error, className, ref, ...props }: Props) => {
  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      <input
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
