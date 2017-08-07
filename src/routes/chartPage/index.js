import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Popover, Icon, ActivityIndicator } from 'antd-mobile';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, Hint } from 'react-vis';
import 'react-vis/dist/style.css';
import styles from './index.less';

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };
    this.clientResize = this._clientResize.bind(this);
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

  render() {
    const { data, loading } = this.props;
    const { innerWidth, innerHeight } = this.state;
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.header}>
            二十八宿访问统计图
          </div>
          <div className={styles.body}>
            {
              loading.models.Chart ?
                <ActivityIndicator toast text="正在加载" /> :
                <XYPlot
                  width={innerWidth * 0.8}
                  height={innerHeight * 0.5}
                  animation
                >
                  <LineMarkSeries
                    color="#108EE9"
                    curve={'curveMonotoneX'}
                    data={data}
                    size={4}
                  />
                  <HorizontalGridLines />
                  <XAxis
                    title="日期"
                    tickFormat={value => `${value}日`}
                    tickTotal={data.length}
                    tickLabelAngle={45}
                    tickPadding={30}
                    tickSize={5}
                    style={{
                      line: { stroke: '#ffffff' },
                      text: { stroke: 'none', fill: '#ffffff', fontWeight: 300, fontSize: 15 },
                    }}
                  />
                  <YAxis
                    title="访问人数"
                    style={{
                      line: { stroke: '#ffffff' },
                      text: { stroke: 'none', fill: '#ffffff', fontWeight: 300, fontSize: 15 },
                    }}
                  />
                </XYPlot>
            }
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
  data: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  ...state.present.Chart,
  loading: state.present.loading,
});

export default connect(mapStateToProps)(ChartPage);
