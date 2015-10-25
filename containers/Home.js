import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {
  requestLocationPermission,
  fetchCheckinsByFilter,
  setDistanceFilter,
  switchDisplayMode,
  MODE
} from '../actions';
import List from '../components/List';
import CheckinCard from '../components/CheckinCard';

const pugImg = require('../assets/pug.png')

function mapStateToProps(state) {
  const { checkinsByFilter, geolocation, home } = state;
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
    home,
    markers
  };
}

@connect(
  state => (mapStateToProps(state)),
  { requestLocationPermission, fetchCheckinsByFilter, setDistanceFilter, switchDisplayMode }
)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      requestLocationPermission,
      fetchCheckinsByFilter
    } = this.props
    requestLocationPermission();
    fetchCheckinsByFilter();
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

  switchDistanceFilter(distance){
    const { setDistanceFilter, fetchCheckinsByFilter } = this.props
    setDistanceFilter(distance);
    fetchCheckinsByFilter();
  }

  handleSwitchDisplayMode(mode){
    this.props.switchDisplayMode(mode);
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
    return <CheckinCard key={checkin.id} checkin={checkin}/>;
  }

  renderMap(){
    const { markers } = this.props;
    return(
      <GoogleMap
        containerProps={{ style: { height: '100%', width: '100%' } }}
        defaultZoom={12}
        defaultCenter={this.currentMapCenter()}
      >
        {this.renderCurrentLocationMarker()}
        {this.renderMarkers(markers)}
      </GoogleMap>
    );
  }

  renderList(){
    const { checkinsByFilter } = this.props;
    return(
      <List
        isFetching={checkinsByFilter.isFetching}
        items={checkinsByFilter.checkins}
        renderItem={this.renderCheckin}
      />
    );
  }

  render() {
    const { geolocation, checkinsByFilter, home } = this.props;
    return (
      <div>
        <h1>列出附近 {checkinsByFilter.distanceFilter } 公里的打卡</h1>
        <h2>目前位置: {geolocation.isRequesting ? '正在搜尋所在位置..' : `${geolocation.current.lat}, ${geolocation.current.lng}`}</h2>
        <div>
          <button onClick={()=> this.switchDistanceFilter(0.1)}>100 公尺</button>
          <button onClick={()=> this.switchDistanceFilter(0.5)}>500 公尺</button>
          <button onClick={()=> this.switchDistanceFilter(1)}>1 公里</button>
          <button onClick={()=> this.switchDistanceFilter(5)}>5 公里</button>
        </div>
        <div>
          <button onClick={()=> this.handleSwitchDisplayMode(MODE.LIST)}>列表模式</button>
          <button onClick={()=> this.handleSwitchDisplayMode(MODE.MAP)}>地圖模式</button>
        </div>
        <section style={{height: '500px', width: '100%'}}>
          {(home.mode == MODE.MAP) ? this.renderMap(): this.renderList()}
        </section>
      </div>
    );
  }
}
