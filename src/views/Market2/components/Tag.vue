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

.comp-tag {
  display: inline-flex;
  width: 11rem;
  line-height: 2rem;
  text-align: center;
  font-size: 0.7rem;
  border-radius: 0.2rem;
  overflow: hidden;
  .label {
    display: block;
    width: 40%;
    color: $color-white;
    background-color: $color-blue;
  }
  .value {
    display: block;
    flex: 1;
    font-size: 1.17em;
    color: $color-primary;
    background-color: #f1f3f5;
  }
}
</style>

