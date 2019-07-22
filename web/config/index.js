"use strict";

// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/jwt": {
        target: "http://192.168.0.105:8765",
        pathRewrite: {
          "^/jwt": "/jwt"
        }
      },
      "/api": {
        target: "http://192.168.0.105:8765", //王坤/
        // target: 'http://192.168.0.119:8765',//李俊波
        // target: "http://192.168.0.5:8765", //服务器
        // target: 'http://192.168.0.144:8765',//郑金龙
        // target: 'http://192.168.0.107:8765',//胡兵/刘科地址
        pathRewrite: {
          "^/api": "/api"
        }
      },
      /**
       * 报表
       * */
      "/ureport": {
        // target: 'http://192.168.0.119:7788',//李俊波
        target: "http://192.168.0.5:7788", //服务器
        pathRewrite: {
          "^/ureport": "/ureport"
        }
      }
    },

    // Various Dev Server settings

    // can be overwritten by process.env.HOST
    // if you want dev by ip, please set host: '0.0.0.0'
    host: "0.0.0.0",
    port: 9527, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-source-map",

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: "/",

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:prod --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
};
