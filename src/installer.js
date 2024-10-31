import * as components from './components'

export default {
  install: (app) => {
    // Register all components
    for (const key in components) {
      app.component(key, components[key])
    }
  }
} 
