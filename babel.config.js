module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // 巨坑：默认情况下会使用 babel-polyfill，如果安装该 npm 的项目也使用了 babel-polyfill，则会报错，useBuiltIns：false 可以解决
        // 详情看官网：https://cli.vuejs.org/zh/guide/browser-compatibility.html#polyfill
        useBuiltIns: false
      }
    ]
  ]
}
