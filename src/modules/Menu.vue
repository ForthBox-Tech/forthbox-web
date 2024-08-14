<template>
  <nav class="fbx-menu">
    <router-link
      v-for="item in menu"
      :key="item.path"
      :to="item.path"
      :class="{
        'menu-item': true,
        active: (item.related || [item.path]).indexOf($route.path) > -1,
      }"
    >
      <span class="text">{{ item.text }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    menu: Array,
  },
}
</script>

<style lang="scss">
.fbx-menu {
  display: block;
  margin: 0 auto;
  line-height: 3;
  text-align: left;
  font-size: 0.9rem;
  color: #fff;
  white-space: nowrap;
  overflow: auto hidden;
  border-bottom: 0.05rem solid #5a5c66;
  @media (max-width: 768.89px) {
    padding: 0 0.4rem;
    font-size: 0.75rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .menu-item {
    display: inline-block;
    padding: 0.5rem 1.2rem 0;
    color: inherit;
    cursor: pointer;
    @media (max-width: 768.89px) {
      padding: 0.3rem 0.3rem 0;
    }
    .text {
      display: inline-block;
      padding: 0 0.3rem;
      border-bottom: 0.15rem solid transparent;
    }
    &.active {
      .text {
        border-bottom-color: #efb35c;
      }
    }
  }
}
</style>

