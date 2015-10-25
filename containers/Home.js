import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { requestLocationPermission, fetchCheckinsByFilter } from '../actions';
import List from '../components/List';

const pugImg = require('../assets/pug.png')

function mapStateToProps(state) {
  const { checkinsByFilter, geolocation } = state;
  const markers = state.checkinsByFilter.checkins.map((checkin, index) => {
    return {
      checkin,
      position: {
        lat: checkin.latitude,
        lng: checkin.longitude
      },
      defaultAnimation: 2
    };
  });

  return {
    checkinsByFilter,
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
    const {
      requestLocationPermission,
      fetchCheckinsByFilter,
      geolocation,
      checkinsByFilter
    } = this.props
    requestLocationPermission();
    fetchCheckinsByFilter(checkinsByFilter.distanceFilter, geolocation.current);
  }

  renderMarkers(markers) {
    return markers.map((marker, index) => {
      return <Marker key={marker.checkin.id} {...marker}/>;
    });
  }

  renderCurrentLocationMarker(){
    const { geolocation } = this.props
    if(geolocation.current){
      const position = geolocation.current
      const icon = {
        url: pugImg,
        scaledSize: {
          height: 67,
          width: 55
        },
        labelOrigin: {x: 25 ,y: 40}
      }
      return (
        <Marker
          position={position}
          icon={icon}
          label={{text: '我'}}
          defaultAnimation={2}
        />
      )
    }
  }

  currentMapCenter(){
    const { geolocation } = this.props
    if(geolocation.current){
      return geolocation.current;
    } else {
      return { lat: 25.048176, lng: 121.517069 };
    }
  }

  renderCheckin(checkin){
    return (
      <div key={checkin.id}>
        <h3>{checkin.name}</h3>
        <h3>{checkin.address}</h3>
        <h3>{checkin.photo.url}</h3>
      </div>
    )
  }

  render() {
    const { geolocation, markers, checkinsByFilter } = this.props;
    return (
      <div>
        <h1>列出附近 {checkinsByFilter.distanceFilter } 公里的打卡</h1>
        <h2>目前位置: {geolocation.isRequesting ? '正在搜尋所在位置..' : '' + geolocation.current.lat + ',' + geolocation.current.lng + ''} </h2>
        <section style={{height: '500px', width: '100%'}}>
          <GoogleMap
            containerProps={{ style: { height: '100%', width: '100%' } }}
            defaultZoom={12}
            defaultCenter={this.currentMapCenter()}
          >
            {this.renderCurrentLocationMarker()}
            {this.renderMarkers(markers)}
          </GoogleMap>
          <List
            isFetching={checkinsByFilter.isFetching}
            items={checkinsByFilter.checkins}
            renderItem={this.renderCheckin}
          />
        </section>
      </div>
    );
  }
}
