import { MouseEventHandler, ReactNode } from 'react';

import styles from './IconButton.module.css';

type Props = {
  onClick: MouseEventHandler;
  icon: ReactNode;
};

const IconButton = ({ onClick, icon }: Props) => {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
