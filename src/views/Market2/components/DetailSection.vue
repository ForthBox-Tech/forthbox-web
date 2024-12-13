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
    .title {
      flex: 1;
      width: 0;
      font-size: inherit;
      font-weight: 500;
      padding: 0 1rem;
      @include ellipsis(1);
      @media (max-width: 768.89px) {
        padding: 0 4%;
      }
    }
    .trigger {
      position: relative;
      width: 3rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        width: 2.4rem;
      }
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%) rotate(45deg);
        display: block;
        width: 0.65em;
        height: 0.65em;
        border-bottom: 0.05rem solid $color-primary;
        border-right: 0.05rem solid $color-primary;
      }
      &.active {
        &::before {
          transform: translate(-50%, -30%) rotate(-135deg);
        }
      }
    }
  }
  .content {
    border-top: 0.05rem solid $color-border;
    padding: 0.7rem 1rem 1rem;
    line-height: 1.8;
    font-size: 0.8em;
    @media (max-width: 768.89px) {
      padding: 3% 4% 5%;
    }
    .item {
      display: flex;
      margin-bottom: 0.3rem;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        display: block;
        flex: 1;
        width: 0;
      }
      .value {
        color: $color-blue;
      }
      .link {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .text {
      white-space: pre-line;
    }
  }
}
</style>

