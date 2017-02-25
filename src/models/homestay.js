import { parse } from 'qs';
import { queryHomeStayInfoById, queryHomeStayHouseById, queryHomeStayAlbumById } from '../services/homestay';

export default {

  namespace: 'HomeStay',

  state: {
    info: {},
    album: [],
    house: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname.indexOf('/homeStay/') >= 0) {
          dispatch({
            type: 'queryHomeStayInfo',
            payload: {
              id: location.pathname.split('/')[ 2 ]
            }
          });
          dispatch({
            type: 'queryHomeStayAlbum',
            payload: {
              id: location.pathname.split('/')[ 2 ]
            }
          });
          dispatch({
            type: 'queryHomeStayHouse',
            payload: {
              id: location.pathname.split('/')[ 2 ]
            }
          });
        }
      });
    },
  },

  effects: {
    * queryHomeStayInfo({ payload }, { call, put }) {
      const { data, err } = yield call(queryHomeStayInfoById, parse(payload));
      if (err) {
        throw new Error(`fetch错误：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryHomeStayInfoSuccess',
          payload: {
            info: data.data
          }
        });
      } else {
        throw new Error(`接口异常：${data.message}，错误码：${data.code}`);
      }
    },
    * queryHomeStayAlbum({ payload }, { call, put }) {
      const { data, err } = yield call(queryHomeStayAlbumById, parse(payload));
      if (err) {
        throw new Error(`fetch错误：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryHomeStayAlbumSuccess',
          payload: {
            album: data.data,
          }
        });
      } else {
        throw new Error(`接口异常：${data.message}，错误码：${data.code}`);
      }
    },
    * queryHomeStayHouse({ payload }, { call, put }) {
      const { data, err } = yield call(queryHomeStayHouseById, parse(payload));
      if (err) {
        throw new Error(`fetch错误：${err.message}`);
      }
      if (data && data.code === '0000') {
        yield put({
          type: 'queryHomeStayHouseSuccess',
          payload: {
            house: data.data
          }
        });
      } else {
        throw new Error(`接口异常：${data.message}，错误码：${data.code}`);
      }
    },
  },

  reducers: {
    queryHomeStayInfoSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    queryHomeStayAlbumSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    queryHomeStayHouseSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
