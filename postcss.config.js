module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视口宽度
      viewportHeight: 667,
      unitPrecision: 5, // 指定px转换为vw的最小位数
      viewportUnit: 'vw', // 指定要转换的单位
      selectorBlackList: ['lgnore', 'tab-bar', 'tab-bar-item'],
      minPixelValue: 1, // 最小转换单位
      mediaQuery: false // 是否允许媒体查询
    }
  }
}