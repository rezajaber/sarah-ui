#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { program } = require('commander')

program
  .name('sarah-ui')
  .description('CLI for Sarah UI components')
  .version('1.0.0')

program
  .command('add <component>')
  .description('Add a component to your project')
  .action((component) => {
    const componentPath = path.join(__dirname, '../src/components', component)
    const targetPath = path.join(process.cwd(), 'src/components', component)

    if (!fs.existsSync(componentPath)) {
      console.error(`Component "${component}" not found`)
      process.exit(1)
    }

    // Create target directory if it doesn't exist
    fs.mkdirSync(targetPath, { recursive: true })

    // Copy component files
    fs.readdirSync(componentPath).forEach(file => {
      const content = fs.readFileSync(path.join(componentPath, file), 'utf-8')
      fs.writeFileSync(path.join(targetPath, file), content)
    })

    console.log(`✅ Added ${component} component to your project`)
  })

program.parse() 
