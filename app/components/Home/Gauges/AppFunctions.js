// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { Student } from '../../../reducers/types';
import { cloneAll } from '../../../actions/github';
import { saveToDB } from '../../../actions/misc';

import styles from './AppFunctions.css';

type Props = {
  students: Array<Student>,
  cloneAll: Function,
  saveToDB: Function,
};

class AppFunctions extends Component<Props> {
  props: Props;

  cloneAll = () => {
    const { students, cloneAll: cloneAllAction } = this.props;
    if (students.length === 0) return;

    cloneAllAction();
  };

  save = () => {
    const { saveToDB: saveToDBAction } = this.props;

    saveToDBAction();
  };

  render() {
    return (
      <React.Fragment>
        <button type="button" className={styles.button} onClick={this.cloneAll}>
          Batch
        </button>
        <button type="button" className={styles.button} onClick={this.save}>
          Save
        </button>
      </React.Fragment>
    );
  }
}

// AppFunctions.propTypes = {
//   students: PropTypes.arrayOf(PropTypes.object),
//   cloneAll: PropTypes.func,
//   saveToDB: PropTypes.func
// };

// AppFunctions.defaultProps = {
//   students: [{}],
//   cloneAll: () => {},
//   saveToDB: () => {}
// };

const mapStateToProps = state => ({
  students: state.students
});

export default connect(
  mapStateToProps,
  { cloneAll, saveToDB }
)(AppFunctions);
