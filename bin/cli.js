#!/usr/bin/env node

const { execSync } = require('child_process')
const [,, command, component] = process.argv

if (command === 'add') {
  try {
    execSync(`npm install rezajaber-sarah-ui@latest`)
    console.log(`Successfully installed ${component} component`)
  } catch (error) {
    console.error('Failed to install component:', error)
  }
}
