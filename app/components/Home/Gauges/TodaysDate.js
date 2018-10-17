// @flow

import React from 'react';
import formatDate from 'date-fns/format';

import styles from './TodaysDate.css';

export default function TodaysDate() {
  const date = new Date();
  const dateString: string = formatDate(date, 'MMM D ddd');
  const dateArray: Array<string> = dateString.split(' ');
  return (
    <div className={styles.container}>
      <div className={styles.month}>{dateArray[0]}</div>
      <div className={styles.number}>{dateArray[1]}</div>
      <div className={styles.day}>{dateArray[2]}</div>
    </div>
  );
}
