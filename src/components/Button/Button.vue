<template>
  <button
    :class="[
      'rounded cursor-pointer font-medium transition-all duration-200 m-1',
      // Primary variant
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
      // Secondary variant
      variant === 'secondary' && 'bg-gray-500 text-white hover:bg-gray-600',
      // Outline variant
      variant === 'outline' && 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
      // Sizes
      size === 'small' && 'px-3 py-1.5 text-sm',
      size === 'medium' && 'px-4 py-2 text-base',
      size === 'large' && 'px-6 py-3 text-lg',
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed hover:opacity-50'
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'SarahButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
