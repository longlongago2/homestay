import React, { Component, PropTypes } from 'react';
import { Result, Icon } from 'antd-mobile';
import QueueAnimation from 'rc-queue-anim';
import styles from './RegionList.less';

const RegionList = ({ loading, regionList }) => {
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
    <QueueAnimation type="bottom" className={styles.firstList}>
      {
        regionList && regionList.length > 0 ?
          regionList.map((item) => {
            return (
              <div key={`first-${item.id}`} className={styles.listContent}>
                <em>{item.name}</em>
                <div className={styles.secondList}>
                  {
                    item.childRegions && item.childRegions.length > 0 ?
                      item.childRegions.map((secondItem) => {
                        return (
                          <li key={`second-${secondItem.id}`}>
                            <a>
                              <img src="http://up.qqjia.com/z/04/tu6133_4.jpg" alt={secondItem.description} />
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
};
export default RegionList;
