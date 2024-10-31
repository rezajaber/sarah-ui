#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')

const [,, command, component] = process.argv

const COMPONENTS_DIR = path.join(__dirname, '../src/components')
const TARGET_DIR = process.cwd()

async function exportComponent(componentName) {
  const componentDir = path.join(COMPONENTS_DIR, componentName)
  const targetComponentDir = path.join(TARGET_DIR, 'src/components', componentName)

  try {
    // Check if component exists
    if (!fs.existsSync(componentDir)) {
      console.error(`Component ${componentName} not found`)
      return
    }

    // Copy component files
    await fs.copy(componentDir, targetComponentDir)

    // Create or update index.js for the component
    const indexContent = `
import ${componentName} from './${componentName}.vue'

export const Sarah${componentName} = ${componentName}

export default {
  install: (app) => {
    app.component('Sarah${componentName}', ${componentName})
  }
}
`
    await fs.writeFile(
      path.join(targetComponentDir, 'index.js'),
      indexContent.trim()
    )

    console.log(`Successfully exported ${componentName} to src/components/${componentName}`)
    console.log(`You can now edit the component in your project`)

  } catch (error) {
    console.error('Failed to export component:', error)
  }
}

if (command === 'add') {
  // Install the package
  execSync(`npm install rezajaber-sarah-ui@latest`)

  // Export the component
  if (component) {
    exportComponent(component.charAt(0).toUpperCase() + component.slice(1))
  }
}
