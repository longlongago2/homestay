import React, { Component, PropTypes } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
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
          <div className={styles.imageList}>
            {
              oneRegionDetail.images ?
                oneRegionDetail.images.map((item) => {
                  return (
                    <div key={`image-${item.id}`} className={styles.image}>
                      <img src={item.path} alt={item.title} />
                      <span>{item.description}</span>
                    </div>
                  );
                }) : '无图片数据'
            }
          </div>
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
