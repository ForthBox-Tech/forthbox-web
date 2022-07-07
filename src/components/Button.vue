<template>
  <a
    :class="[
      'fbx-btn',
      type ? `btn-${type}` : '',
      disabled || iLoading ? 'disabled' : '',
      iLoading ? 'loading' : '',
    ]"
    @click="onClick"
  >
    <Loader v-if="iLoading"></Loader>
    <slot v-else></slot>
  </a>
</template>

<script>
import Loader from './Loader.vue'

export default {
  name: 'Button',
  components: {
    Loader,
  },
  props: {
    type: String,
    /**
     * 是否禁用按钮
     */
    disabled: Boolean,
    /**
     * 是否Loading（与props.loader互斥，不要同时设置这两个属性）
     */
    loading: Boolean,
    /**
     * 是否启用Loader，配合props.handler使用（与props.loading互斥，不要同时设置这两个属性）
     */
    loader: Boolean,
    /**
     * 点击处理函数，返回Promise
     * @returns Promise
     */
    handler: Function,
  },
  data() {
    return {
      iLoading: false,
    }
  },
  watch: {
    loading(loading) {
      this.iLoading = loading
    },
  },
  methods: {
    onClick() {
      if (typeof this.handler !== 'function') return

