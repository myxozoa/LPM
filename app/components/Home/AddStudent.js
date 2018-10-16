// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import shortid from 'shortid';
import cx from 'classnames';

import { addStudent } from '../../actions/students';
import { ReactObjRef } from '../../reducers/types';

import styles from './AddStudent.css';

type Props = {
  addStudent: Function,
  scrollTarget: ReactObjRef<'div'>,
};

type State = {
  name: string,
  username: string,
  adding: boolean,
};

class AddStudent extends Component<Props, State> {
  focusInput: ReactObjRef<'div'>;

  constructor(props) {
    super(props);

    this.focusInput = React.createRef();
  }

  state = {
    name: '',
    username: '',
    adding: false
  };

  addNewStudent = e => {
    e.preventDefault();
    const { name, username } = e.target;
    const { addStudent: addStudentAction, scrollTarget } = this.props;
    addStudentAction({
      name: name.value,
      username: username.value,
      rating: 0,
      id: shortid.generate()
    });

    this.setState({ name: '', username: '' }, () => {
      if (this.focusInput.current) {
        this.focusInput.current.focus();
      }
    });

    setTimeout(() => {
      if (scrollTarget.current) {
        scrollTarget.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }, 100);
  };

  togglePrompt = () => {
    this.setState(
      prev => ({ adding: !prev.adding, name: '', username: '' }),
      () => {
        const { adding } = this.state;
        if (this.focusInput.current) {
          if (adding) this.focusInput.current.focus();
        }
      }
    );
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, username, adding } = this.state;
    const modalClass = cx(styles.modal, {
      [styles.open]: adding
    });
    const containerClass = cx(styles.container, {
      [styles.containerOpen]: adding
    });
    const formClass = cx(styles.form, {
      [styles.formOpen]: adding
    });
    return (
      <React.Fragment>
        <div className={styles.menu}>
          <button
            className={styles.button}
            type="button"
            onClick={this.togglePrompt}
          >
            <div>
              <span>
                {adding ? (
                  <i className="fas fa-minus" />
                ) : (
                  <i className="fas fa-plus" />
                )}
              </span>
            </div>
          </button>
          <div className={containerClass}>
            <div className={modalClass}>
              <form className={formClass} onSubmit={this.addNewStudent}>
                <input
                  ref={this.focusInput}
                  className={styles.input}
                  type="text"
                  name="name"
                  value={name}
                  placeholder="John Smith"
                  onChange={this.onChange}
                  required
                />
                <input
                  className={styles.input}
                  type="text"
                  name="username"
                  value={username}
                  placeholder="john93"
                  onChange={this.onChange}
                  required
                />
                <button type="submit" className={styles.submit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <svg
          style={{ display: 'none' }}
          xmlns="https://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="5"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addStudent }
)(AddStudent);
