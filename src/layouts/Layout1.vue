<template>
  <div :class="$root.$i18n.locale">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from '@/modules/Nav.vue'

export default {
  components: {
    Nav,
  },
}
</script>
