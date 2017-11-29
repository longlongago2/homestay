import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import styles from './ImageList.less';

class ImageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
    };
  }

  render() {
    const { dataList, loading, keyName } = this.props;
    const { imageLoading } = this.state;
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
                    <a href={item.link || null}>
                      <img
                        src={imageLoading ? require('../statics/default-image.jpg') : item.path}
                        onLoad={() => this.setState({ imageLoading: false })}
                        onError={(e) => {
                          e.target.src = require('../statics/default-image.jpg');
                          this.setState({ imageLoading: false });
                        }}
                        alt={item.title}
                      />
                    </a>
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
  }
}

ImageList.propTypes = {
  dataList: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  keyName: PropTypes.string,
};
export default ImageList;
