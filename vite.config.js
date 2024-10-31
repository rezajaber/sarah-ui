import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        'sarah-ui': resolve(__dirname, 'src/index.js'),
        'components/Button/index': resolve(__dirname, 'src/components/Button/index.js'),
      },
      formats: ['es', 'umd'],
      fileName: (format, entryName) => `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
}) 
