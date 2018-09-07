// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gitUtils from '../../../utils/gitUtils';
import styles from './AppFunctions.css';

type Props = {};

class AppFunctions extends Component<Props> {
  props: Props;

  cloneAll = () => {
    const { students, repo, workingDirectory } = this.props;
    if (students.length === 0) return;

    console.log(repo);
    students.forEach(student => {
      const studentFolder = gitUtils.prepareFolderName(student.name);
      const studentRepo = gitUtils.prepareStudentRepo(repo, student.username);

      gitUtils.clone(studentFolder, studentRepo, workingDirectory);
    });
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
  repo: PropTypes.string,
  workingDirectory: PropTypes.string
};

AppFunctions.defaultProps = {
  students: [{}],
  repo: '',
  workingDirectory: ''
};

const mapStateToProps = state => ({
  students: state.students,
  repo: state.preferences.repo,
  workingDirectory: state.preferences.workingDirectory
});

export default connect(mapStateToProps)(AppFunctions);
