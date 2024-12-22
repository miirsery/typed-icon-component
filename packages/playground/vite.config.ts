import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { typedIconPlugin } from 'typed-icon-template'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    typedIconPlugin({
      iconsPath: path.join(process.cwd(), 'src', 'icons'),
      iconComponentPath: path.resolve(process.cwd(), 'src', 'IconTemplate'),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
