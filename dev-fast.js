#!/usr/bin/env node

import { build } from 'vite'
import { watch } from 'fs'
import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

console.log('🚀 Chrome Extension Fast Development')
console.log('📁 Watching for changes in src/ directory')
console.log('🔄 Auto-rebuilding on file changes...')
console.log('📋 Load the dist/ folder in Chrome extensions')
console.log('💡 Changes will appear after closing/reopening the side panel')
console.log('')

// Initial build
await build()
fixHtmlPaths()
console.log('✅ Initial build complete!')
console.log('🔄 Watching for changes...')
console.log('')

// Watch for changes in src directory
watch('src', { recursive: true }, async (eventType, filename) => {
  if (filename) {
    console.log(`📝 File changed: ${filename}`)
    try {
      await build()
      fixHtmlPaths()
      console.log('✅ Rebuild complete!')
      console.log('🔄 Close and reopen the side panel to see changes')
      console.log('')
    } catch (error) {
      console.error('❌ Build failed:', error.message)
    }
  }
})

// Watch manifest.json
watch('manifest.json', async (eventType, filename) => {
  if (filename) {
    console.log(`📝 Manifest changed: ${filename}`)
    try {
      copyFileSync('manifest.json', 'dist/manifest.json')
      console.log('✅ Manifest updated!')
      console.log('🔄 Reload your extension in Chrome')
      console.log('')
    } catch (error) {
      console.error('❌ Manifest update failed:', error.message)
    }
  }
})

function fixHtmlPaths() {
  try {
    const htmlPath = join(process.cwd(), 'dist/sidepanel.html')
    let htmlContent = readFileSync(htmlPath, 'utf8')
    htmlContent = htmlContent.replace(/src="\.\.\/sidepanel\.js"/g, 'src="./sidepanel.js"')
    htmlContent = htmlContent.replace(/href="\.\.\/sidepanel\.css"/g, 'href="./sidepanel.css"')
    writeFileSync(htmlPath, htmlContent)
  } catch (error) {
    console.log('⚠️ Could not fix HTML paths:', error.message)
  }
}

console.log('💡 Press Ctrl+C to stop watching') 