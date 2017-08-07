const webpack = require('atool-build/lib/webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const PxToRem = require('postcss-pxtorem');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime');

  // babel-plugin-import: Import lib Ant-Design-Mobile and style CSS as required
  webpackConfig.babel.plugins.push([ 'import', { libraryName: 'antd-mobile', style: true } ]);

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

  // SVG 处理
  const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/statics'),                   // 2. 自己私人的 svg 存放目录
  ];

  // 3. 因为一个SVG文件不能被处理两遍. 在atool-build默认为svg配置的 svg-url-loader 里 exclude 掉需要svg-sprite-loader处理的目录
  webpackConfig.module.loaders.forEach((loader) => {
    if (loader.test && typeof loader.test.test === 'function' && loader.test.test('.svg')) {
      loader.exclude = svgDirs;
    }
  });
  // 4. 配置 webpack loader
  webpackConfig.module.loaders.unshift({
    test: /\.(svg)$/i,
    loader: 'svg-sprite-loader',
    include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
  });

  // CSS像素单位px转rem：主要针对使用px作单位的布局，使其按照比例换算成rem单位，方便高清设置整体替换参照物大小来配置布局
  // 如果您的项目全部使用rem布局，则不必使用此插件来转换
  webpackConfig.postcss.push(PxToRem({
    rootValue: 100,
    propList: [ 'font', 'font-size', 'height', 'width', 'line-height' ],
  }));

  return webpackConfig;
};
