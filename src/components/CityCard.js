import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import ImageList from '../components/ImageList';
import styles from './CityCard.less';

const CityCard = ({ oneRegionDetail }) => {
  return (
    <WingBlank size="md">
      <WhiteSpace size="md" />
      <Card>
        <Card.Header
          title={oneRegionDetail.name}
          thumb={require('../statics/city.png')}
          thumbStyle={{ width: '0.8rem', height: '0.8rem' }}
        />
        <Card.Body>
          <ImageList dataList={oneRegionDetail.images} keyName="city-images-" />
        </Card.Body>
        <Card.Footer extra={oneRegionDetail.name} />
      </Card>
      <WhiteSpace size="md" />
    </WingBlank>
  );
};
CityCard.propTypes = {
  oneRegionDetail: PropTypes.object.isRequired,
};

export default CityCard;
