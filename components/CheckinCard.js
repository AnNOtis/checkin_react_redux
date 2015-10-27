import React, { Component, PropTypes } from 'react';
require('../css/card.sass');

export default class CheckinCard extends Component {
  renderCheckinDescription(){
    const { checkin } = this.props;
    if(checkin.user){
      return `${checkin.user.name} 在 ${checkin.name} 打卡`;
    } else {
      return `這裡是 ${checkin.name}`;
    }
  }
  render() {
    const { checkin } = this.props;
    return (
      <div className='card' >
        <div className='card-header'>
          <div className='user'>
            <img src={checkin.user.avatar.url}/>
          </div>
          <div className='title'>{this.renderCheckinDescription()}</div>
          <p className='subtitle'>{checkin.address}</p>
        </div>
        <div className='card-body'>
          {/*<div><img src={checkin.photo.url}/></div>*/}
          { checkin.photo.photo.url &&
            <div className='photo'><img src={checkin.photo.photo.url}/></div>
          }
        </div>
      </div>
    );
  }
}

CheckinCard.propTypes = {
  checkin: PropTypes.shape({
    name: PropTypes.string,
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    address: PropTypes.string,
    comment: PropTypes.string,
    user: PropTypes.object,
    photo: PropTypes.object
  }).isRequired
};
