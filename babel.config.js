module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 自动按需导入
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
