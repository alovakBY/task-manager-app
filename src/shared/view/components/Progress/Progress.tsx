import type { FC } from 'react';
import * as ProgressRadix from '@radix-ui/react-progress';

import styles from './Progress.module.scss';

type Props = {
   value: number;
   label: string;
};

export const Progress: FC<Props> = ({ value }) => {
   return (
      <ProgressRadix.Root value={value} className={styles.root}>
         <ProgressRadix.Indicator
            className={styles.indicator}
            style={{ transform: `translateX(-${100 - value}%)` }}
         />
      </ProgressRadix.Root>
   );
};
