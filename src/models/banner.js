import { parse } from 'qs';
import { queryBannerList } from '../services/banner';

export default {

  namespace: 'Banner',

  state: {
    bannerList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('/') >= 0) {
          dispatch({
            type: 'queryBannerList',
          });
        }
      });
    },
  },

  effects: {
    * queryBannerList({ payload }, { call, put }) {
      const { data, err } = yield call(queryBannerList, parse(payload));
      if (err) {
        throw new Error(`fetch错误：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryBannerListSuccess',
          payload: {
            bannerList: data.data
          }
        });
      } else {
        throw new Error(`接口异常：${data.code}`);
      }
    },
  },

  reducers: {
    queryBannerListSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

