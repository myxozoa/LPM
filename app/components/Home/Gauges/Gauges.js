// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import AppFunctions from './AppFunctions';
import Date from './TodaysDate';
import styles from './Gauges.css';

type Props = {};

class Gauges extends Component<Props> {
  getAverageScore = () => {
    const { students } = this.props;

    const reviewed = students.filter(student => student.rating > 0);
    const sum = reviewed.reduce((acc, student) => acc + student.rating, 0);
    if (sum === 0) return 0;

    return (sum / reviewed.length).toFixed(2);
  };

  getDayReviewPercentage = () => {
    const { students } = this.props;

    const numberOfReviews = students.reduce(
      (acc, student) => acc + !!student.rating,
      0
    ); // add 1 if > 0
    if (numberOfReviews === 0) return 0;

    return Math.floor((numberOfReviews / students.length).toFixed(2) * 100); // Floored to avoid floating point precision issues
  };

  render() {
    const { section } = this.props;
    const reviewPercentage = this.getDayReviewPercentage();
    const averageScore = this.getAverageScore();
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.section}>{section}</div>
          <AppFunctions />
        </div>
        <div className={styles.right}>
          <div className={styles.date}>
            <Date />
          </div>
          <div className={styles.average}>{averageScore}</div>
          <CircularProgressbar
            percentage={reviewPercentage}
            text={`${reviewPercentage}%`}
            initialAnimation
            className={styles.progress}
            styles={{
              path: { stroke: `rgba(39, 167, 207, ${reviewPercentage / 100})` },
              text: { fontWeight: 'bold' }
            }}
          />
        </div>
      </div>
    );
  }
}

Gauges.propTypes = {
  section: PropTypes.string,
  students: PropTypes.arrayOf(PropTypes.object)
};

Gauges.defaultProps = {
  section: 'SECTION',
  students: [{}]
};

const mapStateToProps = state => ({
  section: state.preferences.section,
  students: state.students
});

export default connect(mapStateToProps)(Gauges);
