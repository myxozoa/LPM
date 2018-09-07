// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Student from './Student';
import Gauges from './Gauges/Gauges';
import AddStudent from './AddStudent';
import { setRepo } from '../../actions/preferences';
import styles from './Home.css';

type Props = {};

class Content extends Component<Props> {
  render() {
    const { students, repo, setRepo: setRepoAction } = this.props;
    return (
      <div className={styles.container}>
        {/* <ConfigField placeholder="https://github.com/myxozoa/LPM" /> */}
        <div className={styles.content}>
          <div className={styles.repoContainer}>
            <input
              className={styles.repo}
              type="text"
              placeholder="https://github.com/myxozoa/LPM"
              onChange={e => setRepoAction(e.target.value)}
              value={repo}
            />
          </div>

          <Gauges />

          {students.map(student => (
            <Student key={student.id} {...student} />
          ))}

          <AddStudent />
        </div>
      </div>
    );
  }
}

const studentType = PropTypes.shape({
  name: PropTypes.string,
  username: PropTypes.string,
  rating: PropTypes.number
});

Content.propTypes = {
  students: PropTypes.arrayOf(studentType),
  repo: PropTypes.string,
  setRepo: PropTypes.func
};

Content.defaultProps = {
  students: [],
  repo: '',
  setRepo: () => {}
};

const mapStateToProps = state => ({
  students: state.students,
  repo: state.preferences.repo
});

export default connect(
  mapStateToProps,
  { setRepo }
)(Content);
