import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Banner from '../../components/Banner';
import Region from '../../components/RegionList';
import styles from './index.less';

const IndexPage = ({ dispatch, bannerList, regionList, loading }) => {
  function link(route) {
    dispatch({
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: route,
        search: '',
        key: '0qszea',
      }
    });
  }

  const bannerProps = {
    bannerList,
    loading: loading.models.Banner,
  };
  const regionProps = {
    regionList,
    loading: loading.models.Region,
    onLink: link
  };
  return (
    <div className={styles.container}>
      <Banner {...bannerProps} />
      <Region {...regionProps} />
    </div>
  );
};

IndexPage.propTypes = {
  dispatch: PropTypes.func,
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
