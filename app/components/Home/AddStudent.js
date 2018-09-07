// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { addStudent } from '../../actions/students';
import styles from './AddStudent.css';

type Props = {};

class AddStudent extends Component<Props> {
  addNewStudent = () => {
    const { addStudent: addStudentAction } = this.props; // scope hack
    addStudentAction({
      name: '',
      username: '',
      rating: 0,
      id: shortid.generate()
    });
    window.scrollTo({
      top: 1000,
      behavior: 'smooth'
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className={styles.modal}>

          </div> */}
        <button
          className={styles.button}
          type="button"
          onClick={this.addNewStudent}
        >
          +
        </button>
      </React.Fragment>
    );
  }
}

AddStudent.propTypes = {
  addStudent: PropTypes.func
};

AddStudent.defaultProps = {
  addStudent: () => {}
};

export default connect(
  null,
  { addStudent }
)(AddStudent);
