'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CENTER_API: '"http://www.baidu.com"'  //开发环境的请求域名 百度为例
})
