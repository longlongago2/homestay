import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import {} from 'antd-mobile';
import styles from './RegionDetailPage.less';

const RegionDetailPage = ({ oneRegionDetail, loading }) => {
  return (
    <div>123</div>
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
