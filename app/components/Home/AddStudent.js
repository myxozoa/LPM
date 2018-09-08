// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import cx from 'classnames';
import { addStudent } from '../../actions/students';
import styles from './AddStudent.css';

type Props = {};

class AddStudent extends Component<Props> {
  state = {
    name: '',
    username: '',
    adding: false
  };

  addNewStudent = () => {
    const { addStudent: addStudentAction, scrollTarget } = this.props;
    addStudentAction({
      name: '',
      username: '',
      rating: 0,
      id: shortid.generate()
    });
    setTimeout(() => {
      scrollTarget.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 100);
  };

  prompt = () => {
    this.setState({ adding: true });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, username, adding } = this.state;
    const modalClass = cx(styles.modal, {
      [styles.open]: adding
    });
    return (
      <React.Fragment>
        <div className={styles.addStudent}>
          <div className={styles.container}>
            <div className={modalClass}>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="John Smith"
                onChange={this.onChange}
              />
              <input
                type="text"
                name="username"
                value={username}
                placeholder="john93"
                onChange={this.onChange}
              />
            </div>
          </div>
        </div>
        <button className={styles.button} type="button" onClick={this.prompt}>
          +
        </button>
      </React.Fragment>
    );
  }
}

AddStudent.propTypes = {
  addStudent: PropTypes.func,
  scrollTarget: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

AddStudent.defaultProps = {
  addStudent: () => {},
  scrollTarget: {}
};

export default connect(
  null,
  { addStudent }
)(AddStudent);
