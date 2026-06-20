import React from 'react';

import styles from './UserInfoComponent.module.css';

export const UserInfo: React.FC = () => {
  return (
    <div className={styles.user}>
      <div className={styles.avatarFallback}>G</div>
      <span className={styles.name}>Guest</span>
    </div>
  );
};