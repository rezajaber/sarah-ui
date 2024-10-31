import Button from './Button.vue'

export const SarahButton = Button

export default {
  install: (app) => {
    app.component('SarahButton', Button)
  }
} 
