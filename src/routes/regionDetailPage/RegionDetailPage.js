import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Card, WingBlank, WhiteSpace, Result, Icon, ListView } from 'antd-mobile';
import styles from './RegionDetailPage.less';

const RegionDetailPage = ({ oneRegionDetail, loading }) => {
  if (loading.models.Region) {
    return (
      <Result
        img={<Icon type="loading" className={styles.resultIcon} />}
        title="初始化"
        message="努力加载中，请稍候..."
      />
    );
  }
  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header
          title={oneRegionDetail.name}
          thumb="http://up.qqjia.com/z/04/tu6133_4.jpg" thumbStyle={{ width: '1rem', height: '1rem' }}
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
                }) : '无数据'
            }
          </div>
        </Card.Body>
        <Card.Footer extra={oneRegionDetail.name} />
      </Card>
      <WhiteSpace size="lg" />
      <ListView />
    </WingBlank>
  );
};
RegionDetailPage.propTypes = {
  oneRegionDetail: PropTypes.object,
  loading: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    ...state.present.Region,
    loading: state.present.loading,
  };
}
export default connect(mapStateToProps)(RegionDetailPage);
