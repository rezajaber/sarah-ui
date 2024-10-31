#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')
const prompts = require('prompts')

const [,, command, component] = process.argv

const COMPONENTS_DIR = path.join(__dirname, '../src/components')
const TARGET_DIR = process.cwd()

async function listComponents() {
  const components = fs.readdirSync(COMPONENTS_DIR)
  console.log('\nAvailable components:')
  components.forEach(comp => console.log(`- ${comp.toLowerCase()}`))
}

async function exportComponent(componentName) {
  const componentDir = path.join(COMPONENTS_DIR, componentName)
  const targetComponentDir = path.join(TARGET_DIR, 'src/components', componentName)

  try {
    // Check if component exists
    if (!fs.existsSync(componentDir)) {
      console.error(`Component ${componentName} not found`)
      await listComponents()
      return
    }

    // Check if component already exists in project
    if (fs.existsSync(targetComponentDir)) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Component ${componentName} already exists. Overwrite?`,
        initial: false
      })

      if (!response.overwrite) {
        console.log('Export cancelled')
        return
      }
    }

    // Copy component files
    await fs.copy(componentDir, targetComponentDir)

    // Create or update index.js
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

    console.log(`\nSuccessfully exported ${componentName} to src/components/${componentName}`)
    console.log(`You can now edit the component in your project`)
    console.log(`\nImport it using:`)
    console.log(`import { Sarah${componentName} } from './components/${componentName}'`)

  } catch (error) {
    console.error('Failed to export component:', error)
  }
}

async function main() {
  switch (command) {
    case 'add':
      if (component) {
        const componentName = component.charAt(0).toUpperCase() + component.slice(1)
        await exportComponent(componentName)
      } else {
        console.error('Please specify a component name')
        await listComponents()
      }
      break

    case 'list':
      await listComponents()
      break

    default:
      console.log(`
Sarah UI CLI

Commands:
  add <component>  Export a component to your project
  list            List available components
      `)
  }
}

main()
