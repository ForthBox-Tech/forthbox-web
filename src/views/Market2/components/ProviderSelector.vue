<template>
  <div class="provider-selector">
    <a
      v-for="item in providers"
      :key="item.text"
      :class="['item', modelValue == item.value ? 'active' : '']"
      @click="onSelect(item)"
    >
      {{ item.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'ProviderSelector',
  props: {
    modelValue: String,
  },
  data() {
    return {}
  },
  computed: {
    providers() {
      return [
        { text: this.$t('Market2.All'), value: '' },
        { text: this.$t('Market2.FBXGames'), value: 'official' },
        { text: this.$t('Market2.3rdPartyGames'), value: 'third party' },
      ]
    },
  },
  methods: {
    onSelect(item) {
      this.$emit('update:modelValue', item.value)
      this.$emit('change', item.value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.provider-selector {
  .item {
    margin-left: 0.4rem;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 0.5rem;
    min-width: 3.1rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.6rem;
    color: $color-purple;
    border: 0.05rem solid $color-purple;
    border-radius: 3rem;
    cursor: pointer;
    &.active {
      color: $color-white;
      background-color: $color-purple;
    }
  }
}
</style>

