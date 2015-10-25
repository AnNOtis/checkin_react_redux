import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { GoogleMap, Marker } from 'react-google-maps';
import { requestLocationPermission, fetchCheckinsByFilter } from '../actions';

function mapStateToProps(state) {
  const { checkinsByFilter, geolocation } = state;
  const markers = state.checkinsByFilter.checkins.map((checkin, index) => {
    return {
      ...checkin,
      position: {
        lat: checkin.latitude,
        lng: checkin.longitude
      },
      defaultAnimation: 2
    };
  });

  return {
    geolocation,
    markers
  };
}

@connect(
  state => (mapStateToProps(state)),
  { requestLocationPermission, fetchCheckinsByFilter }
)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestLocationPermission();
    this.props.fetchCheckinsByFilter();
  }

  renderMarkers(markers) {
    markers.map((marker, index) => {
      return (
        <Marker {...marker} />
      );
    })
  }

  renderCurrentLocationMarker(){
    const { geolocation } = this.props
    if(geolocation.current){
      const position = { lat: geolocation.current[0], lng: geolocation.current[1] }
      const icon = {
        url: 'http://www.jokathopugs.com.br/imagens/pug.png',
        scaledSize: {
          height: 67,
          width: 55
        }
      }
      return (
        <Marker
          position={position}
          icon={icon}
          defaultAnimation={2}
        />
      )
    }
  }

  currentMapCenter(){
    const { geolocation } = this.props
    if(geolocation.current){
      return { lat: geolocation.current[0], lng: geolocation.current[1] };
    } else {
      return { lat: 25.048176, lng: 121.517069 };
    }
  }

  render() {
    const { geolocation, markers } = this.props;
    return (
      <div>
        <h1>列出附近的打卡</h1>
        <h2>目前位置: {geolocation.isRequesting ? '正在搜尋所在位置..' : geolocation.current}</h2>
        <section style={{height: '500px', width: '100%'}}>
          <GoogleMap
            containerProps={{ style: { height: '100%', width: '100%' } }}
            defaultZoom={12}
            defaultCenter={this.currentMapCenter()}
            center={this.currentMapCenter()}
          >
            {this.renderCurrentLocationMarker()}
            {this.renderMarkers(markers)}
          </GoogleMap>
        </section>
      </div>
    );
  }
}
