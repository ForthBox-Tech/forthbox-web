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

