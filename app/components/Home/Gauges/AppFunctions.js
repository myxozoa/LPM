// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import nodegit from 'nodegit';
import PropTypes from 'prop-types';
import styles from './AppFunctions.css';

type Props = {};

class AppFunctions extends Component<Props> {
  props: Props;

  clone = (folder: string, repo: string, repoName: string) => {
    const { workingDirectory } = this.props;
    nodegit
      .Clone(repo, `${workingDirectory}/${folder}/${repoName}`)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  cloneAll = () => {
    const { students, repo } = this.props;
    if (students.length === 0) return;

    const repoArray = repo.split('/');
    const repoName = repoArray.slice(-1)[0];

    console.log(repo);
    students.forEach(student => {
      const studentFolder = student.name
        .replace(/\s|\./, '_')
        .replace(/\.+$/, '');
      const temp = repoArray.slice();
      temp.splice(repoArray.length - 2, 1, student.username);
      const studentRepo = temp.join('/');

      this.clone(studentFolder, studentRepo, repoName);
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
