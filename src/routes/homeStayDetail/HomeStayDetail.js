import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Card, WhiteSpace, Result, Icon } from 'antd-mobile';
import Banner from '../../components/Banner';
import ImageList from '../../components/ImageList';
import styles from './HomeStayDetail.less';

const HomeStayDetail = ({ info, album, house, loading }) => {
  if (loading.models.HomeStay) {
    return (
      <div>
        <Result
          img={<Icon type="loading" className={styles.resultIcon} />}
          title="正在处理"
          message="努力加载中，请稍候..."
        />
      </div>
    );
  }
  return (
    <div>
      <Card full>
        <Card.Body>
          <Banner bannerList={info.icons} loading={loading.models.HomeStay} keyName="house" />
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="简介"
          thumb={require('../../statics/introduction.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
        />
        <Card.Body>
          <div className={styles.cardBody}>
            <div>名称：{info.name ? info.name : '无数据'}</div>
            <div>简介：{info.introduction ? info.introduction : '无数据'}</div>
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace />
      <Card full>
        <Card.Header
          title="民宿房型"
          thumb={require('../../statics/house.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
          extra={<span>房型介绍</span>}
        />
        <Card.Body>
          <div className={styles.cardBody}>
            {
              house && house.length > 0 ?
                house.map((item) => {
                  return (
                    <div key={`house-${item.id}`} className={styles.houseList}>
                      <div>
                        房型名称：<b>{item.name}</b>
                      </div>
                      <div>
                        房型描述：{item.description}
                      </div>
                      <div>
                        房型图片：
                        <ImageList dataList={item.images} loading={loading.models.HomeStay} keyName="house-images-" />
                      </div>
                      <div>
                        价格：{item.price}
                      </div>
                    </div>
                  );
                }) : '无数据'
            }
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="民宿相册"
          thumb={require('../../statics/album.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
          extra={<span>最新图集</span>}
        />
        <Card.Body>
          <div className={styles.cardBody}>
            <ImageList dataList={album} keyName="album-" />
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card full>
        <Card.Header
          title="民宿地址"
          thumb={require('../../statics/address.png')}
          thumbStyle={{ height: '0.5rem', width: '0.5rem' }}
        />
        <Card.Body>
          <div className={styles.cardBody}>
            <div>民宿地址：{info.location ? info.location : '无数据'}</div>
            <div>联系方式：{info.contact ? info.contact : '无数据'}</div>
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
    </div>
  );
};
HomeStayDetail.propTypes = {
  info: PropTypes.object,
  album: PropTypes.array,
  house: PropTypes.array,
  loading: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ...state.present.HomeStay,
    loading: state.present.loading,
  };
}
export default connect(mapStateToProps)(HomeStayDetail);
