import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace, Carousel } from 'antd-mobile';
import styles from './HomeStayList.less';

const HomeStayList = ({ homeStayList, onLink }) => {
  return (
    <WingBlank size="md">
      <WhiteSpace size="md" />
      <Card>
        <Card.Header
          title="民宿信息"
          thumb={require('../statics/homeStay.png')}
          thumbStyle={{ width: '0.8rem', height: '0.8rem' }}
        />
        <Card.Body>
          {
            homeStayList && homeStayList.length > 0 ?
              homeStayList.map((item) => {
                return (
                  <div key={`HSList-${item.id}`} className={styles.list} onClick={() => onLink(`/homeStay/${item.id}`)}>
                    <Carousel className={styles.listCarousel} dots={false}>
                      {
                        item.icons && item.icons.length > 0 ?
                          item.icons.map((secondItem) => {
                            return (
                              <div key={`icons-${secondItem.id}`}>
                                <div
                                  className={styles.imgList}
                                  title={secondItem.description}
                                  style={{
                                    background: `#ffffff url('${secondItem.path}') no-repeat center`,
                                    backgroundSize: 'cover',
                                  }}
                                />
                              </div>
                            );
                          }) :
                          <div>
                            <div
                              className={styles.imgList}
                              title="无数据"
                              style={{
                                background: `#ffffff url('${require('../statics/default-image.jpg')}') no-repeat center`,
                                backgroundSize: 'cover',
                              }}
                            />
                          </div>
                      }
                    </Carousel>
                    <div className={styles.listText}>
                      <div className={styles.title}>
                        {item.name}
                      </div>
                      <div
                        className={styles.profile}
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </div>
                  </div>
                );
              }) : '无数据'
          }
        </Card.Body>
        <Card.Footer extra={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 更新`} />
      </Card>
      <WhiteSpace size="md" />
    </WingBlank>
  );
};
HomeStayList.propTypes = {
  homeStayList: PropTypes.array.isRequired,
  onLink: PropTypes.func.isRequired,
};
export default HomeStayList;
