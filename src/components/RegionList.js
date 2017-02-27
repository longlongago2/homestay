import React, { Component, PropTypes } from 'react';
import { Result, Icon } from 'antd-mobile';
import QueueAnimation from 'rc-queue-anim';
import LazyLoad from 'react-lazy-load';
import center from '../HOCs/center';
import styles from './RegionList.less';

const RegionList = ({ loading, regionList, onLink }) => {
  if (loading) {
    return (
      <Result
        img={<Icon type="loading" className={styles.resultIcon} />}
        title="正在处理"
        message="努力加载中，请稍候..."
      />
    );
  }
  return (
    <QueueAnimation type="left" className={styles.firstList}>
      {
        regionList && regionList.length > 0 ?
          regionList.map((item) => {
            return (
              <div key={`first-${item.id}`} className={styles.listContent}>
                <em>{item.name}</em>
                <div name="regionLayout" className={styles.secondList}>
                  {
                    item.childRegions && item.childRegions.length > 0 ?
                      item.childRegions.map((secondItem) => {
                        return (
                          <li key={`second-${secondItem.id}`}>
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                onLink(`/region/${secondItem.id}`);
                              }}
                            >
                              <LazyLoad>
                                <img
                                  src={
                                    secondItem.images && secondItem.images.length > 0 ?
                                      secondItem.images[ 0 ].path :
                                      require('../statics/no-picture.png')
                                  }
                                  alt={secondItem.description}
                                />
                              </LazyLoad>
                            </a>
                            <span>{secondItem.name}</span>
                          </li>
                        );
                      }) : '无数据'
                  }
                </div>
              </div>
            );
          }) : '无数据'
      }
    </QueueAnimation>
  );
};
RegionList.propTypes = {
  loading: PropTypes.bool.isRequired,
  regionList: PropTypes.array.isRequired,
  onLink: PropTypes.func.isRequired,
};
export default center('div[name="regionLayout"]', 'li')(RegionList);
