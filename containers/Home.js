import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { requestLocationPermission } from '../actions';

@connect(
  state => ({ geolocation: state.geolocation }),
  { requestLocationPermission }
)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestLocationPermission();
  }

  render() {
    const { geolocation } = this.props;
    return (
      <div>
        <h1>列出附近的打卡</h1>
        <p>{geolocation && geolocation.current}</p>
      </div>
    );
  }
}
