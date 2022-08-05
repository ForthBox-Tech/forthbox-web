<template>
  <div class="fbx-dialog" v-if="iVisible" @click.self="onHide">
    <div
      :class="['dialog-bg', bgAnimate ? (iBgAnimate ? 'fadeIn' : 'fadeOut') : '']"
      :style="bgVisible ? '' : 'visibility: hidden;'"
      @click.self="onHide"
      @touchmove.prevent.stop
    ></div>
    <div :class="['dialog-main', animate ? (iAnimate ? 'fadeIn' : 'fadeOut') : '']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
    },
    animate: {
      type: Boolean,
    },
    bgVisible: {
      type: Boolean,
      default: true,
    },
    bgAnimate: {
      type: Boolean,
    },
  },
  data() {
    return {
      iBgAnimate: false,

