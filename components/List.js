import React, { Component, PropTypes } from 'react';
const loadingImg = require('../assets/loading.gif');
require('../css/list.sass');

export default class List extends Component {
  render() {
    const { isFetching, items, renderItem } = this.props;

    const isEmpty = items.length === 0;
    if(isEmpty && isFetching) {
      return (<div className='list'><div className='loading'><img src={loadingImg} /></div></div>);
    }

    if(isEmpty) {
      return (<div className='list'><div className='empty'>找不到喔</div></div>);
    }

    return (
      <div className='list'>
        {items.map(renderItem)}
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

List.defaultProps = {
  isFetching: true
};
