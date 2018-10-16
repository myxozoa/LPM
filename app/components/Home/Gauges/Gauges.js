// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';

import { Student } from '../../../reducers/types';

import AppFunctions from './AppFunctions';
import Date from './TodaysDate';
import styles from './Gauges.css';

type Props = {
  section: string,
  students: Array<Student>
};

class Gauges extends Component<Props> {
  getAverageScore = (): string => {
    const { students } = this.props;

    const reviewed = students.filter(student => student.rating > 0);
    const sum = reviewed.reduce((acc, student) => acc + student.rating, 0);
    if (sum === 0) return '0';

    return (sum / reviewed.length).toFixed(2);
  };

  getDayReviewPercentage = (): string => {
    const { students } = this.props;

    // add 1 if > 0
    const numberOfReviews = students.reduce((acc, student) => acc + !!student.rating, 0);
    if (numberOfReviews === 0) return '0';

    // Floored to avoid floating point precision issues
    return Math.floor((numberOfReviews / students.length) * 100).toFixed(2);
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
              path: { stroke: `rgba(39, 167, 207, ${+reviewPercentage / 100})` },
              text: { fontWeight: 'bold' }
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  section: state.preferences.section,
  students: state.students
});

export default connect(mapStateToProps)(Gauges);
