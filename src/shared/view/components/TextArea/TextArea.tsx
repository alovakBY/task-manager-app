import type { TextareaHTMLAttributes } from 'react';
import cn from 'clsx';

import styles from './TextArea.module.scss';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
   label?: string;
   error?: string;
};

export const TextArea = ({ label, error, className, ...props }: Props) => {
   return (
      <div className={styles.root}>
         {label && (
            <label htmlFor={props.id} className={styles.label}>
               {label}
            </label>
         )}
         <textarea
            className={cn(styles.textarea, className, {
               [styles.textareaError]: error,
            })}
            {...props}
         />
         {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
   );
};
