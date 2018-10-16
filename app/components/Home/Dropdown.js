// @flow

import React from 'react';
// import PropTypes from 'prop-types';
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
  // console.log(open);
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

// Dropdown.propTypes = {
//   removeStudent: PropTypes.func,
//   open: PropTypes.bool,
//   openFolder: PropTypes.func
// };

// Dropdown.defaultProps = {
//   removeStudent: () => {},
//   open: false,
//   openFolder: () => {}
// };

export default Dropdown;
