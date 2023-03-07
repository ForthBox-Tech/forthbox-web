<template>
  <div class="fbx-loading">
    <img src="@/assets/comp-page/loading.gif" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>
<style lang="scss">
.fbx-loading {
  margin: 4rem 0;
  text-align: center;
  // .loading {
  //   width: 2rem;
  //   height: 2rem;
  //   animation: Loading 2s ease-in infinite;
  // }
  @keyframes Loading {
    0% {
      opacity: 1;
