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
      'https://xxx.png',
    ],
    'title': '@ctitle(5,10)',
    'link': 'http://www.baidu.com',
  } ],
  'regionTreeList|10': [ {
    'childRegions|4-10': [ {
      'childRegions': [],
      'description': '@cword(10)',
      'id': '@id',
      'images|0-1': [ {
        'description': '@cword(12)',
        'id': '@id',
        'path|+1': [
          'http://up.qqjia.com/z/04/tu6133_4.jpg',
          'http://img.cnjiayu.net/3211573049-3310678237-21-0.jpg',
          'http://www.qqtouxiang.com/d/file/keai/20170222/107d88b32d5098e328300266b32a6392.jpg',
          'http://up.qqya.com/allimg/201710-t/17-101803_106599.jpg',
        ],
        'title': '',
        'type': 'REGION',
      } ],
      'name': '@city',
    } ],
    'description': '@cword(10)',
    'id|+1': 1,
    'name': '@province',
  } ],
  'oneRegionDetail': {
    'childRegions': [],
    'description': '@cword(50)',
    'id': '@id',
    'images|1-4': [ {
      'description': '',
      'id|+1': 0,
      'path|+1': [
        'https://xxx.jpg',
        'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
      ],
      'title': '@ctitle(5,10)',
      'link': 'http://www.sougou.com',
    } ],
    'name': '@city',
  },
  'homeStayList|15': [ {
    'description': '@cword(50)',
    'icons|0-4': [ {
      'description': '@cword(15)',
      'id': '@id',
      'path|+1': [
        'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
        'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
      ],
      'title': '@ctitle(5,10)',
    } ],
    'id': '@id',
    'name': '@cword(3,10)',
  } ],
  'homeStayDetail': {
    'info': {
      'id': '@id',
      'contact': '18751872057',
      'description': '@cword(12)',
      'introduction': '锻炼减肥的拉丝粉骄傲的了房间爱上的了<a href="http://www.baidu.com">哈哈哈，你点我！</a>，的记录撒酒疯大栏是否',
      'location': '@county(true)',
      'name': '@cword(3,5)',
      'icons': [ {
        'path|+1': [
          'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
          'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
        ],
        'refId': '@id',
        'link': 'https://www.360.cn/'
      } ],
    },
    'album|10': [ {
      'id': '@id',
      'title': '@ctitle(12)',
      'description': '@cword(12)',
      'path': 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
    } ],
    'house|3': [ {
      'id': '@id',
      'images|3': [ {
        'id': '@id',
        'path|1': [ 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg', 'http://xxx.jpg' ],
        'title': '@cword(5)',
        'description': '@cword(12)',
        'link': 'https://www.awesomes.cn/',
      } ],
      'name': '@cword(5)',
      'price': '¥506',
      'description': '@cword(12)',
      'link': 'https://www.awesomes.cn/',
    } ],
  },
});
// 数据持久
if (!global.resData) {
  global.resData = mockData;
}

module.exports = {

  'GET /banner.do': function (req, res) {
    const code = '0000';
    if (code === '0000') {
      setTimeout(() => {
        res.json({
          code,
          data: global.resData.bannerList,
          message: '',
        });
      }, 1000);
    } else {
      res.json({
        code,
        data: {},
        message: '服务器的未知错误',
      });
    }
  },
  'GET /region.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.regionTreeList,
        message: '',
      });
    }, 3000);
  },
  'GET /region/:regionId.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: mockData.oneRegionDetail,
        message: '',
      });
    }, 1000);
  },
  'GET /region/:regionId/homestay.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.homeStayList,
        message: '',
      });
    }, 1000);
  },
  'GET /homestay/:id.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.homeStayDetail.info,
        message: '',
      });
    }, 1000);
  },
  'GET /homestay/:id/album.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.homeStayDetail.album,
        message: '',
      });
    }, 1000);
  },
  'GET /homestay/:id/house.do': function (req, res) {
    const code = '0000';
    setTimeout(() => {
      res.json({
        code,
        data: global.resData.homeStayDetail.house,
        message: '',
      });
    }, 1000);
  },

};
