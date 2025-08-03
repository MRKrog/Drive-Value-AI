import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import hotReloadExtension from 'hot-reload-extension-vite'

export default defineConfig({
  plugins: [
    react(),
    hotReloadExtension({
      log: true,
      backgroundPath: 'src/background.js'
    }),
    {
      name: 'copy-manifest',
      writeBundle() {
        copyFileSync('manifest.json', 'dist/manifest.json')
        // Copy sidepanel.html to the correct location
        copyFileSync('dist/src/sidepanel.html', 'dist/sidepanel.html')
        // Fix the paths in the copied HTML file
        const htmlPath = resolve(__dirname, 'dist/sidepanel.html')
        let htmlContent = readFileSync(htmlPath, 'utf8')
        htmlContent = htmlContent.replace(/src="\.\.\/sidepanel\.js"/g, 'src="./sidepanel.js"')
        htmlContent = htmlContent.replace(/href="\.\.\/sidepanel\.css"/g, 'href="./sidepanel.css"')
        writeFileSync(htmlPath, htmlContent)
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      input: {
        sidepanel: resolve(__dirname, 'src/sidepanel.html'),
        background: resolve(__dirname, 'src/background.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  base: '',
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}) 