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
