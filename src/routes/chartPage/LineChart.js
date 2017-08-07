import React from 'react';
import PropTypes from 'prop-types';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, Hint } from 'react-vis';
import 'react-vis/dist/style.css';

const LineChart = ({ innerWidth, innerHeight, data }) => (
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
);
LineChart.propTypes = {
  innerWidth: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default LineChart;
