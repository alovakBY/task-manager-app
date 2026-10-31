import type { InputHTMLAttributes } from 'react';
import cn from 'clsx';

import styles from './Input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
   label?: string;
   error?: string;
};

export const Input = ({ label, error, className, ...props }: Props) => {
   return (
      <div className={styles.root}>
         {label && (
            <label htmlFor={props.id} className={styles.label}>
               {label}
            </label>
         )}
         <input
            className={cn(styles.input, className, {
               [styles.inputError]: error,
            })}
            {...props}
         />
         {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
   );
};
