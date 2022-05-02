<template>
  <div class="comp-tag">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: ['label', 'value'],
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

