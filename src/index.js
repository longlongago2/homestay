import dva from 'dva';
import createLoading from 'dva-loading';
import { hashHistory } from 'dva/router';
import { Toast } from 'antd-mobile';
import undoable from 'redux-undo';
import './index.html';
import './index.less';

// 1. Initialize
const app = dva({
  history: hashHistory,
  initialState: {},
});

// 2. Plugins
app.use(createLoading({
  namespace: 'loading',
  effect: false
}));
app.use({
  onReducer(reducer) {
    return (state, action) => {
      const undoOpts = {
        debug: false,
        limit: false,
        filter: () => true,
        initTypes: [ '@@redux-undo/INIT' ],
        neverSkipReducer: false,
      };
      const newState = undoable(reducer, undoOpts)(state, action);
      return { ...newState, routing: newState.present.routing };
    };
  },
  onError(e) {
    Toast.info(e.message, 2, null, false);
  }
});

// 3. Model
app.model(require('./models/banner'));
app.model(require('./models/region'));
app.model(require('./models/homestay'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
