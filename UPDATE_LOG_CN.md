### v2.0.2【2024/06/06】

- 修复：小米手机自带浏览器点击进度条会重新播放
- 优化：进度条速度

### v2.0.1【2024/06/05】

- 修复：Bug

### v2.0.0【2024/06/04】

- 新增：支持在 Nuxt SSR 运行
- 其他：修改组件默认名称为 `vue-audio-player`

### v1.6.2【2024/06/04】

- 修复：手机锁屏不显示播放器的 Bug

### v1.6.1【2024/06/04】

- 优化：<a href="https://github.com/1014156094/vue-audio-player/issues/67" target="_blank">:disabled-progress-drag 和 :disabled-progress-click 为 true 时不显示鼠标手</a>

- 修复：<a href="https://github.com/1014156094/vue-audio-player/issues/63" target="_blank">出现警告：Since upgrading to 1.5.3: Sourcemap pointing to missing source files</a>

### v1.6.0【2024/06/04】

- 新增：锁屏可以设置封面和切换下一首等等

### v1.5.3【2023/11/29】

- 新增: `showPlayLoading` 属性

### v1.5.2【2023/07/12】

- 修复: 选择了两倍播放，下一首的时候又默认变回一倍了

### v1.5.1【2023/03/29】

- 优化: 美化 `UI`

### v1.5.0【2022/03/20】

- 新增：`Vue2` 和 `Vue3` 运行都没问题
- 新增：无需单独引入 `CSS` 文件

### v1.4.0【2022/03/05】

- 新增：插槽 `play-prev`、`play-start`、`play-pause` 和 `play-next`
- 新增：`play-error` 事件
- 优化：外观和布局

### v1.3.0【2022/01/25】

- 优化：缩小包体积
- 修改：样式引入改为 `import '@liripeng/vue-audio-player/lib/style.css'`

### v1.2.11【2021/06/17】

- 新增：`disabled-progress-drag` 属性
- 新增：`disabled-progress-click` 属性
- 新增：`progress-start` 事件
- 新增：`progress-move` 事件
- 新增：`progress-end` 事件
- 新增：`progress-click` 事件
