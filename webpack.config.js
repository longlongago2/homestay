const webpack = require('atool-build/lib/webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const glob = require('glob');
const PxToRem = require('postcss-pxtorem');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime');

  // babel-plugin-import: Import lib Ant-Design-Mobile and style CSS as required
  webpackConfig.babel.plugins.push([ 'import', { libraryName: 'antd-mobile', style: 'css' } ]);

  webpackConfig.plugins.push(
    // global variable
    new webpack.ProvidePlugin({
      $: 'jquery',
      api: path.join(__dirname, './src/utils/api.js')
    }),
    // open browser automatically after command 'npm start'
    new OpenBrowserPlugin({
      url: 'http://localhost:8989',
      browser: 'chrome'
    })
  );

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader, index) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  // svg 处理
  // 1. 如需添加私有图标，可在如下的 svgDirs 数组中加入本地 svg 文件路径
  const svgDirs = [
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
  ];

// 2. 把属于 antd-mobile 内置 svg 文件也加入进来
  const antdDir = require.resolve('antd-mobile').replace(/warn\.js$/, '');
  svgDirs.push(antdDir);

  // 3. 因为一个 SVG 文件不能被处理两遍. exclude 掉 atool-build 默认为svg配置的svg-url-loader
  webpackConfig.module.loaders.forEach((loader) => {
    if (loader.test.toString() === '/\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/') {
      loader.exclude = svgDirs;
    }
  });
  
  // 4. 配置 webpack loader
  webpackConfig.module.loaders.unshift({
    test: /\.(svg)$/i,
    loader: 'svg-sprite',
    include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
  });

  // CSS像素单位 px 转 rem：配合高清方案
  webpackConfig.postcss.push(PxToRem({
    rootValue: 100,
    propList: [ 'font', 'font-size', 'height', 'width', 'line-height' ],
  }));

  return webpackConfig;
};
