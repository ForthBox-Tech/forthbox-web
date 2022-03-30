<template>
  <section class="detail-section">
    <header class="header">
      <img v-if="icon" class="icon" :src="icon" />
      <h3 class="title">{{ title }}</h3>
      <i :class="['trigger', visible ? 'active' : '']" @click="onToggle"></i>
    </header>
    <section class="content" v-if="visible">
      <p v-if="text" class="text">{{ text }}</p>
      <ul v-else-if="list && list.length" class="list">
        <li v-for="item in list" :key="item.label" class="item">
          <span class="label">{{ item.label }}</span>
          <a v-if="item.link" class="value link" target="_blank" :href="item.link">
            {{ item.value }}
          </a>
          <span v-else class="value">{{ item.value }}</span>
        </li>
      </ul>
      <slot v-else></slot>
    </section>
  </section>
</template>

<script>
export default {
  name: 'DetailSection',
  props: {
    icon: String,
    title: String,
    text: String,
    list: Array,
  },
  data() {
    return {
      visible: true,
    }
  },
  methods: {
    onToggle() {
      this.visible = !this.visible
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.detail-section {
  display: inline-block;
  box-sizing: border-box;
  border: 0.05rem solid $color-border;
  vertical-align: top;
  font-size: 1rem;
  @media (max-width: 768.89px) {
    font-size: 0.8rem;
  }
  .header {
    display: flex;
    align-items: center;
    line-height: 4rem;
    @media (max-width: 768.89px) {
      line-height: 2.7rem;
    }
    .icon {
      margin-left: 1rem;
      width: 1.2em;
      @media (max-width: 768.89px) {
        margin-left: 4%;
      }
    }
