import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';
import HomePage from './routes/homePage';
import RegionDetail from './routes/regionDetail';
import HomeStayDetail from './routes/homeStayDetail';

const Website = ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage} />
      <Route path="/region/:regionId" component={RegionDetail} />
      <Route path="/homeStay/:id" component={HomeStayDetail} />
    </Router>
  );
};

Website.propTypes = {
  history: PropTypes.object
};

export default Website;
