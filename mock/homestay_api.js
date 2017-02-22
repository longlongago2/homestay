'use strict';

const Mock = require('mockjs');
// 模拟数据
const mockData = Mock.mock({
  'bannerList|3': [ {
    'id|+1': 1,
    'description': '@csentence(3, 5)',
    'order|+1': 0,
    'path|+1': [
      'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
      'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
      'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png'
    ],
    'title': '@ctitle(5,10)',
  } ],
  'regionTreeList|10': [ {
    'childRegions|8': [ {
      'childRegions': [],
      'description': '@cword(10)',
      'id|+1': 100,
      'name': '@city'
    } ],
    'description': '@cword(10)',
    'id|+1': 1,
    'name': '@province'
  } ],
  'oneRegionDetail': {
    'childRegions': [],
    'description': '@cword(10)',
    'id': '@id',
    'images|2': [ {
      'description': '@cword(10)',
      'id|+1': 0,
      'path|+1': [
        'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
        'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
      ],
      'title': '@ctitle(5,10)'
    } ],
    'name': '@city'
  },
});
// 数据持久
if (!global.resData) {
  global.resData = mockData;
}

module.exports = {

  'GET /homestay/banner.do': function (req, res) {
    const code = '0000';
    if (code === '0000') {
      setTimeout(() => {
        res.json({
          code,
          data: global.resData.bannerList,
          message: '',
        });
      }, 1000);
    }
  },
  'GET /homestay/region.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.regionTreeList,
        message: '',
      });
    }, 3000);
  },
  'GET /homestay/region/:regionId.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.oneRegionDetail,
        message: ''
      });
    }, 1000);
  }

};
