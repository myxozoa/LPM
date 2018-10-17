// @flow

import React from 'react';
import cx from 'classnames';

import styles from './Dropdown.css';

function Dropdown({
  removeStudent,
  open,
  openFolder
}: {
  removeStudent: Function,
  open: boolean,
  openFolder: Function
}) {
  const dropClass = cx(styles.container, {
    [styles.open]: open
  });
  return (
    <div className={dropClass}>
      <button className={styles.button} type="button" onClick={openFolder}>
        Open Folder
      </button>
      <button className={styles.button} type="button" onClick={removeStudent}>
        Remove
      </button>
    </div>
  );
}

export default Dropdown;
