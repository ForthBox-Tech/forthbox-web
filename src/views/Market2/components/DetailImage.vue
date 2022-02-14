<template>
  <div class="detail-image">
    <div
      class="image"
      :style="{
        backgroundImage: image ? `url(${image})` : '',
      }"
    ></div>
    <div class="stamp" v-if="stamp">
      <div>{{ stamp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailImage',
  props: {
    image: String,
    stamp: String,
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.detail-image {
  position: relative;
  min-width: 30rem;
  width: 40%;
  background-color: $color-placeholder;
  border-radius: 0.5rem;
  overflow: hidden;
  @media (max-width: 768.89px) {
    min-width: auto;
    width: 100%;
  }
  .image {
    display: block;
    padding-top: 100%;
    background: center center / contain no-repeat;
  }
  .stamp {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 3rem;
    font-weight: bold;
    color: $color-white;
    background-color: $color-black;
    opacity: 0.5;
  }
}
</style>

