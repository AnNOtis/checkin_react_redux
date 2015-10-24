import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

@connect(
  state => ({}),
  {pushState}
)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
