// @flow

import React from 'react';
import formatDate from 'date-fns/format';
import styles from './TodaysDate.css';

export default function TodaysDate() {
  const date = new Date();
  return (
    <div className={styles.container}>
      <div className={styles.month}>{formatDate(date, 'MMM')}</div>
      <div className={styles.number}>{formatDate(date, 'D')}</div>
      <div className={styles.day}>{formatDate(date, 'ddd')}</div>
    </div>
  );
}
