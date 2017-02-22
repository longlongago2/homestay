import React, { Component, PropTypes } from 'react';
import { Carousel, ActivityIndicator } from 'antd-mobile';
import styles from './Banner.less';

const Banner = ({ bannerList, loading }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <ActivityIndicator size="large" />
      </div>
    );
  }
  return (
    <div className={styles.carouselLayout}>
      <Carousel
        className={styles.carousel}
        autoplay={bannerList && bannerList.length > 0}
        infinite={bannerList && bannerList.length > 0}
      >
        {
          bannerList && bannerList.length > 0 ?
            bannerList.map(item =>
              <a key={item.id}>
                <img src={item.path} alt={item.description} title={item.title} />
              </a>
            ) :
            <a>
              <li>无数据</li>
            </a>
        }
      </Carousel>
    </div>
  );
};

Banner.propTypes = {
  bannerList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Banner;
