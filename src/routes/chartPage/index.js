import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ActivityIndicator, Button, Modal } from 'antd-mobile';
import moment from 'moment';
import LineChart from './LineChart';
import styles from './index.less';

const alert = Modal.alert;

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      date: moment().format('YYYY-MM'),
    };
    this.clientResize = this._clientResize.bind(this);
    this.handleAlertPress = this._handleAlertPress.bind(this);
  }


  componentDidMount() {
    window.addEventListener('resize', this.clientResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.clientResize);
  }

  _clientResize() {
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
  }

  _handleAlertPress(yearAndMonth) {
    const { dispatch } = this.props;
    this.setState({ date: yearAndMonth });
    dispatch({
      type: 'Chart/queryChartData',
      payload: {
        date: yearAndMonth
      },
    });
  }

  render() {
    const { data, loading } = this.props;
    const { innerWidth, innerHeight, date } = this.state;
    return (
      <div className={styles.layout}>
        {
          loading.models.Chart && <ActivityIndicator toast text="正在加载" />
        }
        <div className={styles.content}>
          <div className={styles.header}>
            二十八宿访问统计图：{date}
          </div>
          <div className={styles.body}>
            {Array.isArray(data) && data.length === 0 && !loading.models.Chart ? '无数据' : null}
            <Button
              className={styles.popup}
              activeClassName={styles.popupPress}
              onClick={() => alert('请选择月份', <div>{`本月：${moment().format('YYYY-MM')}，按月份查看`}</div>, [
                {
                  text: `${moment().format('MM')} 月`,
                  onPress: () => this.handleAlertPress(moment().format('YYYY-MM'))
                },
                {
                  text: `${moment().subtract(1, 'months').format('MM')} 月`,
                  onPress: () => this.handleAlertPress(moment().subtract(1, 'months').format('YYYY-MM'))
                },
                {
                  text: `${moment().subtract(2, 'months').format('MM')} 月`,
                  onPress: () => this.handleAlertPress(moment().subtract(2, 'months').format('YYYY-MM'))
                },
              ])}
            >
              ...
            </Button>
            <LineChart innerHeight={innerHeight} innerWidth={innerWidth} data={data} />
          </div>
        </div>
        <div className={styles.footer}>
          &copy; 2017 二十八宿 All Rights Reserved
        </div>
      </div>
    );
  }
}

ChartPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.present.Chart,
  loading: state.present.loading,
});

export default connect(mapStateToProps)(ChartPage);
