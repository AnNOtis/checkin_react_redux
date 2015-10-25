import React, { Component, PropTypes } from 'react';
const loadingImg = require('../assets/loading.gif');

export default class List extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button style={{ fontSize: '150%' }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const { isFetching, items, renderItem } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><img src={loadingImg} /></h2>;
    }

    return (
      <div>
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
