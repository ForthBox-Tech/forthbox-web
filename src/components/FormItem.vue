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

<style lang="scss">
@import '@/common/css/variable.scss';

.fbx-form-item {
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  .label {
    line-height: 2rem;
    font-size: inherit;
    font-weight: 500;
  }
  .tips {
    margin-top: -0.2rem;
    line-height: 1.2;
    font-size: 0.86em;
    color: $color-secondary;
    margin-bottom: 0.5rem;
  }
  .error {
    margin-top: 0.2rem;
    font-size: 0.86em;
    color: #f88387;
  }
}
</style>

