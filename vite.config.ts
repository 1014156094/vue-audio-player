import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  root: 'examples',

  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'VueAudioPlayer',
      fileName: (format) => `vue-audio-player.${format}.js`
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router', "@liripeng/vue-audio-player"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },

    outDir: resolve(__dirname + '/lib')
  }
})
