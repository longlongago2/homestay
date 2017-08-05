import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'dva';
import 'antd/lib/layout/style/index.less';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

const ChartPage = ({ data }) => {
  return (
    <Layout>
      <Sider className={styles.sider}>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

ChartPage.propTypes = {
  data: PropTypes.array.isRequired,
};

export default connect()(ChartPage);
