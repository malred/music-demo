const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不使用eslint来检查代码格式
  lintOnSave: false,
  transpileDependencies: true
})
