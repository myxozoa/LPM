// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import AppFunctions from './AppFunctions';
import styles from './Gauges.css';

type Props = {};

class Gauges extends Component<Props> {
  render() {
    const { section } = this.props;
    const percentage = 66;
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.section}>{section}</div>
          <AppFunctions />
        </div>
        <div className={styles.right}>
          <CircularProgressbar
            percentage={percentage}
            text={`${percentage}%`}
            initialAnimation
            className={styles.progress}
            styles={{
              path: { stroke: `rgba(39, 167, 207, ${percentage / 100})` },
              text: { fontWeight: 'bold' }
            }}
          />
        </div>
      </div>
    );
  }
}

Gauges.propTypes = {
  section: PropTypes.string
};

Gauges.defaultProps = {
  section: 'SECTION'
};

const mapStateToProps = state => ({
  section: state.preferences.section
});

export default connect(mapStateToProps)(Gauges);
