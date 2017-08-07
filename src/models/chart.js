import { parse } from 'qs';
import moment from 'moment';
import { queryChartScaleData } from '../services/chart';

export default {
  namespace: 'Chart',
  state: {
    data: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const defaultDate = moment().format('YYYY-MM');
        if (location.pathname === '/chart') {
          dispatch({
            type: 'queryChartData',
            payload: {
              date: defaultDate,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryChartData({ payload }, { call, put }) {
      const { data, err } = yield call(queryChartScaleData, parse(payload));
      if (err) {
        throw new Error(`fetch错误：${err.message}`);
      }
      if (data && data.code === '0000') {
        data.data.length > 0 && data.data.forEach((item) => {
          item.x = moment(item.x, 'YYYY-MM-DD').format('DD'); // 只取日期的日(day)值
        });
        yield put({
          type: 'queryChartDataSuccess',
          payload: {
            data: data.data,
          },
        });
      } else {
        throw new Error(`接口异常：${data.message}，错误码：${data.code}`);
      }
    },
  },
  reducers: {
    queryChartDataSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

