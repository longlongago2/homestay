import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Banner from '../../components/Banner';
import styles from './IndexPage.less';

const IndexPage = ({ bannerList, region, regionOneList, loading }) => {
  const bannerProps = {
    bannerList,
    loading: loading.models.Banner ? loading.models.Banner : false,
  };
  return (
    <div className={styles.container}>
      <Banner {...bannerProps} />
      <ul className={styles.list}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  );
};

IndexPage.propTypes = {
  bannerList: PropTypes.array,
  region: PropTypes.array,
  regionOneList: PropTypes.array,
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
