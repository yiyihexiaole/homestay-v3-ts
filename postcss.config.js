module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375, //设计稿的视口宽度
      selectorBlackList: ["favor"],
    },
  },
};
