<template>
  <Dialog :visible="visible">
    <div class="fb-account">
      <div class="header">
        <img class="logo" src="@/assets/common/logo.png" />
        <div class="close" @click="onClose"></div>
      </div>
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '../components/Dialog'

export default {
  components: {
    Dialog,
  },
  props: {
    visible: Boolean,
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.fb-account {
  background-color: #fff;
  border-radius: 1.2rem;
  &::before,
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  .header {
    position: relative;
    padding: 1.9rem 2.6rem 0;
    .logo {
      width: 8.6rem;
    }
    .close {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      width: 0.9rem;
      height: 0.9rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAMAAADnhAzLAAAAAXNSR0IArs4c6QAAAFdQTFRFAAAAk5OTkZGRk5OTlJSUkpKSk5OTkZGRk5OTkZGRkZGRkZGRk5OTkpKSkpKSkZGRkpKSkpKSkpKSkpKSk5OTkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSjwv7xQAAABx0Uk5TAEBBQkVGR0hJSnl7f4Ganp+m4eLk6Orr9fb3+SH2U/YAAABwSURBVBjTVdBHFoAgDATQsaDG3gXh/uc02AhZ5f1FZl6AacsRptwHYHNa/VJZNwPFGYxFJ5DmJbu3z4KwGW9SHmtZUpHN5mIBOqY6ErJMRsWiGyON7suFMHqzgtGf/hmJPt74L4fsw7YA45KI7HztL5ERCmMcboI1AAAAAElFTkSuQmCC)
        0 0 no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
  }
  .main {
    padding: 0 2.6rem;
    width: 15.4rem;
    max-width: 15.4rem;
  }
  @media (max-width: 768.89px) {
    .main {
      padding: 0 2rem;
      width: 70vw;
    }
  }
}
</style>
