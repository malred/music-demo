// postcss是css预处理器
module.exports = {
  // 插件的配置
  plugins: {
    // 配置px转为rem
    'postcss-pxtorem': {
      // rem由根元素大小决定,这里指定根目录大小
      rootValue: 37.5,
      propList: ['*']
    },
  },
};
