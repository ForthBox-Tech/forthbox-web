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
      transform: scale(1.5);
    }
    10% {
      opacity: 0;
      transform: scale(0.5);
    }
    35% {
      opacity: 1;
      transform: scale(1.2) skew(145deg);
    }
    55% {
      transform: scale(1.2) rotateY(130deg);
    }
    75% {
      transform: scale(0.6) rotateY(0deg);
    }
    100% {
      transform: scale(0) rotateY(0deg);
    }
  }
}
</style>

