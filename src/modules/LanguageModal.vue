<template>
  <div class="modal-language" v-if="visible" @click.stop="">
    <div class="row head" @click="onHide">
      <span>Choose language</span>
    </div>
    <div :class="['row', $root.$i18n.locale == 'en' ? 'active' : '']" @click="onLanguage('en')">
      <span class="text">English</span>
    </div>
    <div
      :class="['row', $root.$i18n.locale == 'zh-TW' ? 'active' : '']"
      @click="onLanguage('zh-TW')"
    >
      <span class="text">中文 (繁體)</span>
    </div>
    <div :class="['row', $root.$i18n.locale == 'ko' ? 'active' : '']" @click="onLanguage('ko')">
      <span class="text">한국어</span>
    </div>
  </div>
</template>

<script>
import { isInElem } from '@/common/js/utils'

export default {
  name: 'LanguageModal',
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      if (this.visible) return
      this.visible = true
    },
    hide() {
      if (!this.visible) return
      this.visible = false
    },
    toggle() {
      this.visible ? this.hide() : this.show()
    },

