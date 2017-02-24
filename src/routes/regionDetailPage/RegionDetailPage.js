import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import CityCard from '../../components/CityCard';
import HomeStayList from '../../components/HomeStayList';
import styles from './RegionDetailPage.less';

const RegionDetailPage = ({ dispatch, oneRegionDetail, homeStayList, loading }) => {
  function link(route) {
    dispatch({
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: route,
        search: '',
        key: '0aseeb',
      }
    });
  }

  if (loading.models.Region) {
    return (
      <div>
        <Result
          img={<Icon type={require('../../statics/no-picture.svg')} className={styles.resultIcon} />}
          title="初始化"
          message="努力加载中，请稍候..."
        />
        <WhiteSpace />
        <Icon type="loading" className={styles.resultIcon} />
        <WhiteSpace />
      </div>
    );
  }
  return (
    <div>
      <CityCard oneRegionDetail={oneRegionDetail} />
      <HomeStayList homeStayList={homeStayList} onLink={route => link(route)} />
    </div>
  );
};
RegionDetailPage.propTypes = {
  dispatch: PropTypes.func,
  oneRegionDetail: PropTypes.object,
  homeStayList: PropTypes.array,
  loading: PropTypes.object,
};
function mapStateToProps(state) {
  return {
    ...state.present.Region,
    loading: state.present.loading,
  };
}
export default connect(mapStateToProps)(RegionDetailPage);
