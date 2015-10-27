import React, { Component, PropTypes } from 'react';
require('../css/card.sass');
require('../css/animate.css');

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
    const {
      checkin: {
        user,
        address,
        photo,
        comment,
        createdAt
      }
    } = this.props;
    return (
      <div className='card animated fadeIn' >
        <div className='card-header'>
          <div className='user'>
            <img src={user.avatar.url}/>
          </div>
          <div className='title'>{this.renderCheckinDescription()}</div>
          <p className='subtitle'>{address}</p>
        </div>
        <div className='card-body'>
          {
            photo.photo.url &&
              <div className='photo'><img src={photo.photo.url}/></div>
          }
          {
            comment && comment.length !== 0 &&
            <div className='comment'>{comment}</div>
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
