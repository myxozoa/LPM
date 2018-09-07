// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WorkingDirectory from './WorkingDirectory';

import { setSection } from '../../actions/preferences';

import styles from './Preferences.css';
import routes from '../../constants/routes.json';
import sections from '../../constants/links.json';

type Props = {};

class Preferences extends Component<Props> {
  props: Props;

  selectSection = e => {
    const { setSection: set } = this.props;
    set(e.target.value);
  };

  render() {
    const { section } = this.props;
    return (
      <div className={styles.container}>
        <Link to={routes.HOME}>{'<'}</Link>
        <h1>Preferences</h1>
        <div>
          <select onChange={this.selectSection} value={section}>
            {Object.keys(sections).map((sec: string) => (
              <option value={sec}>{sec}</option>
            ))}
          </select>
          <WorkingDirectory />
        </div>
      </div>
    );
  }
}

Preferences.propTypes = {
  section: PropTypes.string,
  setSection: PropTypes.func
};

Preferences.defaultProps = {
  section: 'SECTION',
  setSection: () => {}
};

const mapStateToProps = state => ({
  section: state.preferences.section
});

export default connect(
  mapStateToProps,
  { setSection }
)(Preferences);
