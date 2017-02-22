import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Banner from '../../components/Banner';
import Region from '../../components/RegionList';
import styles from './IndexPage.less';

const IndexPage = ({ bannerList, regionList, loading }) => {
  const bannerProps = {
    bannerList,
    loading: loading.models.Banner,
  };
  const regionProps = {
    regionList,
    loading: loading.models.Region,
  };
  return (
    <div className={styles.container}>
      <Banner {...bannerProps} />
      <Region {...regionProps} />
    </div>
  );
};

IndexPage.propTypes = {
  bannerList: PropTypes.array,
  regionList: PropTypes.array,
  loading: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ...state.present.Banner,
    ...state.present.Region,
    loading: { ...state.present.loading },
  };
}

export default connect(mapStateToProps)(IndexPage);
