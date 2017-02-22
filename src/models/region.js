import { Toast } from 'antd-mobile';

export default {

  namespace: 'Region',

  state: {
    region: [],
    regionOneList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          dispatch({
            type: 'queryRegionList',
          });
        }
      });
    },
  },

  effects: {
    * queryRegionList({ payload }, { call, put }) {
      Toast.loading('数据加载中...', 0);
      yield put({
        type: 'queryRegionListSuccess'
      });
    },
  },

  reducers: {
    queryRegionListSuccess(state, action) {
      //Toast.hide();
      return { ...state, ...action.payload };
    },
  },

};
