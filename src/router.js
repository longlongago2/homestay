import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/indexPage/IndexPage';
import RegionDetailPage from './routes/regionDetailPage/RegionDetailPage';

const Website = ({ history }) => {
  return (
    <Router history={history}>
      <IndexPage component={IndexPage} />
      <Route path="/" component={IndexPage} />
      <Route path="/region/:regionId" component={RegionDetailPage} />
    </Router>
  );
};

Website.propTypes = {
  history: PropTypes.object
};

export default Website;
