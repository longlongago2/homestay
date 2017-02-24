import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Card, WhiteSpace } from 'antd-mobile';
import styles from './HomeStayDetail.less';

const HomeStayDetail = ({ address, album, house }) => {
  return (
    <div>
      <Card full>
        <Card.Body>
          <div>这是图片</div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="民宿地址"
          thumb={require('../../statics/address.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
        />
        <Card.Body>
          <div>这是卡片内容</div>
        </Card.Body>
        <Card.Footer extra={<div>这是尾部介绍</div>} />
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="民宿房型"
          thumb={require('../../statics/house.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
          extra={<span>房型介绍</span>}
        />
        <Card.Body>
          <div>这是卡片内容</div>
        </Card.Body>
        <Card.Footer extra={<div>这是尾部介绍</div>} />
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="民宿相册"
          thumb={require('../../statics/album.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
          extra={<span>最新图集</span>}
        />
        <Card.Body>
          <div>这是卡片内容</div>
        </Card.Body>
        <Card.Footer extra={<div>这是尾部介绍</div>} />
      </Card>
      <WhiteSpace size="lg" />
    </div>
  );
};
HomeStayDetail.propTypes = {
  address: PropTypes.object,
  album: PropTypes.array,
  house: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    ...state.present.HomeStay,
    loading: state.present.loading,
  };
}
export default connect(mapStateToProps)(HomeStayDetail);
