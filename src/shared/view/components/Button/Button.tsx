import cn from 'clsx';

import { Loader } from '@/shared/view/components/Loader/Loader';

import styles from './Button.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   variant?: 'primary' | 'secondary';
   isLoading?: boolean;
};

export const Button = ({
   children,
   variant = 'primary',
   isLoading,
   className,
   disabled,
   ...props
}: Props) => {
   return (
      <button
         className={cn(styles.btn, styles[variant], className)}
         disabled={disabled || isLoading}
         {...props}
      >
         {isLoading ? <Loader size="small" /> : children}
      </button>
   );
};
