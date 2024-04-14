import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
    nodePolyfills(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TypedIconComponent',
      fileName: 'typed-icon-component',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
  },
})
