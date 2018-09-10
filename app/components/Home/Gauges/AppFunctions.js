// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import gitUtils from '../../../utils/gitUtils';
import { cloneAll } from '../../../actions/github';
import styles from './AppFunctions.css';

type Props = {};

class AppFunctions extends Component<Props> {
  props: Props;

  cloneAll = () => {
    const { students, cloneAll: cloneAllAction } = this.props;
    if (students.length === 0) return;

    // console.log(repo);
    // students.forEach(student => {

    // const studentFolder = gitUtils.prepareFolderName(student.name);
    // const studentRepo = gitUtils.prepareStudentRepo(repo, student.username);

    // gitUtils.clone(student.name, repo, student.username, workingDirectory);
    cloneAllAction();
    // });
  };

  render() {
    return (
      <React.Fragment>
        <button type="button" className={styles.button} onClick={this.cloneAll}>
          Batch
        </button>
        <button type="button" className={styles.button}>
          Save
        </button>
      </React.Fragment>
    );
  }
}

AppFunctions.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
  cloneAll: PropTypes.func
};

AppFunctions.defaultProps = {
  students: [{}],
  cloneAll: () => {}
};

const mapStateToProps = state => ({
  students: state.students
});

export default connect(
  mapStateToProps,
  { cloneAll }
)(AppFunctions);
