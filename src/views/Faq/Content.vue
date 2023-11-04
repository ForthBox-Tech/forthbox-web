<template>
  <div class="content-inline" :class="{ expand: expand }">
    <div class="question">
      <div class="text">
        <slot name="question"></slot>
      </div>
      <div class="icon" @click="onClick"></div>
    </div>
    <div class="answer">
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
    }
  },
  methods: {
    onClick() {
      this.expand = !this.expand
    },
  },
}
</script>

<style lang="scss" scoped>
.content-inline {
  margin-top: 0.95rem;
  padding: 2rem 1.9rem;
  font-size: 1.1rem;
  background-color: #0c0d27;
  border-radius: 0.5rem;
  border: 0.05rem solid rgba(255, 255, 255, 0.24);
  @media (max-width: 768.89px) {
    margin-top: 0.5rem;
    padding: 0.6rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }
  .question {
    display: flex;
    .text {
      flex: 1;
    }
    .icon {
      width: 2rem;
      height: 2rem;
      background: url('~@/assets/page-faq/question-expand.png') center center / 80% no-repeat;
      cursor: pointer;
      @media (max-width: 768.89px) {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
  .answer {
    display: none;
    margin-top: 1.8rem;
    text-align: left;
    white-space: pre-wrap;
    color: #c6c7e3;
    font-size: 0.9rem;
    @media (max-width: 768.89px) {
      margin-top: 0.6rem;
      font-size: 0.65rem;
    }
    .text-blue {
      color: #00f0ff;
      text-decoration: underline;
    }
  }
  &.expand {
    .question {
      .icon {
        background-image: url('~@/assets/page-faq/question-close.png');
        background-size: 100%;
      }
    }
    .answer {
      display: block;
    }
  }
}
</style>
