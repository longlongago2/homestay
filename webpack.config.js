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

  // svg icon config
  const svgDirs = []; // 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
  // 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
  glob.sync('node_modules/**/*antd-mobile/lib', { dot: true }).forEach((p) => {
    svgDirs.push(new RegExp(p));
  });
  // exclude the default svg-url-loader from
  // atool-build https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L161
  webpackConfig.module.loaders.forEach((loader) => {
    if (loader.test.toString() === '/\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/') {
      loader.exclude = svgDirs;
    }
  });
  // Note: https://github.com/kisenka/svg-sprite-loader/issues/4
  // Can not process SVG files twice. You need to make sure of it yourself.
  webpackConfig.module.loaders.unshift({
    test: /\.svg$/,
    loader: 'svg-sprite',
    include: svgDirs,
  });

  // CSS像素单位 px 转 rem：配合高清方案
  webpackConfig.postcss.push(PxToRem({
    rootValue: 100,
    propList: [ 'font', 'font-size', 'height', 'width', 'line-height' ],
  }));

  return webpackConfig;
};
