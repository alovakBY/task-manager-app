import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/constants';

import { Button } from '../Button/Button';

import styles from './NotFound.module.scss';

type Props = {
   title: string;
};

export const NotFound = ({ title }: Props) => {
   const navigate = useNavigate();

   return (
      <div className={styles.root}>
         <div className={styles.notFound}>{title} not found</div>
         <Button
            className={styles.button}
            onClick={() => navigate(ROUTES.lists)}
         >
            To Lists
         </Button>
      </div>
   );
};
