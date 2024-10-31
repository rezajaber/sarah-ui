<template>
  <button
    :class="[
      'sarah-button',
      `sarah-button--${variant}`,
      `sarah-button--${size}`,
      { 'sarah-button--disabled': disabled }
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

<style>
.sarah-button {
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  margin: 4px;
}

.sarah-button--primary {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
}

.sarah-button--primary:hover {
  background-color: #2563eb;
}

.sarah-button--secondary {
  background-color: #6b7280;
  color: white;
  padding: 8px 16px;
}

.sarah-button--secondary:hover {
  background-color: #4b5563;
}

.sarah-button--outline {
  background-color: transparent;
  border: 2px solid #3b82f6;
  color: #3b82f6;
  padding: 8px 16px;
}

.sarah-button--outline:hover {
  background-color: #3b82f6;
  color: white;
}

.sarah-button--small {
  padding: 6px 12px;
  font-size: 14px;
}

.sarah-button--medium {
  padding: 8px 16px;
  font-size: 16px;
}

.sarah-button--large {
  padding: 12px 24px;
  font-size: 18px;
}

.sarah-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sarah-button--disabled:hover {
  opacity: 0.5;
}
</style>
