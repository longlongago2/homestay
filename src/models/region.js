import { parse } from 'qs';
import { queryRegionList, queryOneRegionDetailByRegionId } from '../services/region';

export default {

  namespace: 'Region',

  state: {
    regionList: [],
    oneRegionDetail: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          dispatch({
            type: 'queryRegionList',
          });
        }
        if (location.pathname.indexOf('/region/') >= 0) {
          dispatch({
            type: 'queryOneRegionDetail',
            payload: {
              regionId: location.pathname.split('/')[ 2 ]
            }
          });
        }
      });
    },
  },

  effects: {
    * queryRegionList({ payload }, { call, put }) {
      const { data, err } = yield call(queryRegionList, parse(payload));
      if (err) {
        throw new Error(`fetch报错：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryRegionListSuccess',
          payload: {
            regionList: data.data,
          }
        });
      } else {
        throw new Error(`接口异常：${data.code}`);
      }
    },
    * queryOneRegionDetail({ payload }, { call, put }) {
      const { data, err } = yield call(queryOneRegionDetailByRegionId, parse(payload));
      if (err) {
        throw new Error(`fetch报错：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryOneRegionDetailSuccess',
          payload: {
            oneRegionDetail: data.data
          }
        });
      } else {
        throw new Error(`接口异常：${data.code}`);
      }
    }
  },

  reducers: {
    queryRegionListSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    queryOneRegionDetailSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
