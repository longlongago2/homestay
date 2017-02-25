import React, { Component, PropTypes } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import ImageList from '../components/ImageList';
import styles from './CityCard.less';

const CityCard = ({ oneRegionDetail }) => {
  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header
          title={oneRegionDetail.name}
          thumb={require('../statics/city.png')}
          thumbStyle={{ width: '1rem', height: '1rem' }}
        />
        <Card.Body>
          <div className={styles.abstract}>
            <div className={styles.abstractTitle}>
              简介
            </div>
            <div className={styles.abstractText}>
              {oneRegionDetail.description ? oneRegionDetail.description : '无数据'}
            </div>
          </div>
          <ImageList dataList={oneRegionDetail.images} keyName="city-images-" />
        </Card.Body>
        <Card.Footer extra={oneRegionDetail.name} />
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
  );
};
CityCard.propTypes = {
  oneRegionDetail: PropTypes.object.isRequired,
};

export default CityCard;
