<template>
  <div class="fbx-form-item">
    <div class="label">{{ label }}</div>
    <div v-if="tips" class="tips">{{ tips }}</div>
    <slot></slot>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    label: String,
    tips: String,
    error: String,
  },
}
</script>

