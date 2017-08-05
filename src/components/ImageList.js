import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import LazyLoad from 'react-lazy-load';
import styles from './ImageList.less';

const ImageList = ({ dataList, loading, keyName }) => {
  if (loading) {
    return <Icon type="loading" style={{ height: '0.5rem', width: '0.5rem' }} />;
  }
  return (
    <div className={styles.imageList}>
      {
        dataList && dataList.length > 0 ?
          dataList.map((item) => {
            return (
              <div key={`${keyName}-${item.id}`} className={styles.layout}>
                <div className={styles.image}>
                  <LazyLoad>
                    <a href={item.link}>
                      <img
                        src={item.path}
                        onError={(e) => {
                          e.target.src = require('../statics/default-image.jpg');
                        }}
                        alt={item.title}
                      />
                    </a>
                  </LazyLoad>
                </div>
                {
                  item.description && item.description.trim() !== '' ?
                    <div className={styles.description}>
                      {`${item.description.substr(0, 12)}...`}
                    </div> : null
                }
              </div>
            );
          }) : '无图片数据'
      }
    </div>
  );
};
ImageList.propTypes = {
  dataList: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  keyName: PropTypes.string,
};
export default ImageList;
