<template>
  <div class="detail-board">
    <h1 class="name">{{ name }}</h1>
    <div class="tags" v-if="tags && tags.length">
      <template v-for="(tag, index) in tags" :key="tag.label">
        <Tag
          class="tag"
          :style="[index % 2 == 1 ? 'margin-right: 0' : '']"
          :label="tag.label"
          :value="tag.value"
        ></Tag>
        <br v-if="index % 2 == 1 && index < tags.length - 1" />
      </template>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
  name: 'DetailBoard',
  components: {
    Tag,
  },
  props: {
    name: String,
    tags: Array,
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.detail-board {
  flex: 1;
  width: 0;
  margin-left: 3vw;
  @media (max-width: 768.89px) {
    width: auto;
    margin-left: 0;
  }

  .name {
    margin-bottom: 1%;
    line-height: 1.5;
    font-size: 2rem;
    @include ellipsis(1);
    @media (max-width: 768.89px) {
      margin-bottom: 0;
      font-size: 1.5rem;
      line-height: 2;
    }
  }
  .tags {
    margin: 2% 0 3.6%;
    font-size: 0;
    @media (max-width: 768.89px) {
      margin: 0 0 3.6%;
    }
  }
  .tag {
    margin: 0 1rem 0.75rem 0;
    @media (max-width: 768.89px) {
      margin: 0 3% 3% 0;
      width: 48.5%;
      line-height: 1.6rem;
      font-size: 0.6rem;
    }
  }
}
</style>
<style lang="scss">
@import '@/common/css/variable.scss';

.detail-board {
  .price-wrap {
    margin: 1.5rem 0;
    display: flex;
    @media (max-width: 768.89px) {
      margin: 0.5rem 0;
    }
    .board {
      flex: 1;
      margin-right: 1.5rem;
      padding: 0.9rem 1rem 1rem;
      color: $color-primary;
      background-color: #f6f6f6;
      border-radius: 0.5rem;
      &:last-child {
        margin-right: 0;
      }
      @media (max-width: 768.89px) {
        margin-right: 0.5rem;
        padding: 2.4% 3% 3.2%;
        border-radius: 0.3rem;
      }
      .name {
        font-size: 0.8rem;
        @media (max-width: 768.89px) {
          font-size: 0.7rem;
        }
      }
      .value {
        margin-top: 0.1rem;
        font-size: 1.8rem;
        @media (max-width: 768.89px) {
          font-size: 1.2rem;
        }
        &.fbx::before,
        &.usdc::before {
          content: '';
          margin-right: 0.2em;
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          background: 0 0 / 100% no-repeat;
          vertical-align: middle;
          @media (max-width: 768.89px) {
            width: 0.7rem;
            height: 0.7rem;
          }
        }
        &.fbx::before {
          background-image: url('~@/assets/common/token-fbx.png');
        }
        &.usdc::before {
          background-image: url('~@/assets/common/token-usdc.png');
        }
        .text {
          vertical-align: middle;
        }
        .unit {
          margin-left: 0.6em;
          font-size: 0.5em;
        }
      }
      .dollar {
        font-size: 0.9rem;
        color: $color-gray;
        @media (max-width: 768.89px) {
          font-size: 0.7rem;
        }
      }
      .setting {
        margin: 0.6rem 0 0.8rem;
        display: flex;
        @media (max-width: 768.89px) {
          margin: 0.4rem 0 0.5rem;
        }
        .set-select {
          margin-right: 0.5rem;
          width: 5rem;
          @media (max-width: 768.89px) {
            margin-right: 3%;
            width: 42%;
          }
        }
        .set-input {
          flex: 1;
        }
      }
      .amount {
        margin: 0.8rem 0 0;
        @media (max-width: 768.89px) {
          margin: 0.5rem 0 0;
        }
      }
    }
  }
  .btns-wrap {
    margin-top: 2.5rem;
    @media (max-width: 768.89px) {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
    .fbx-btn {
      @include btn-stroke-pure();
      position: relative;
      display: block;
      margin-bottom: 1rem;
      line-height: 3.4rem;
      font-size: 1.2rem;
      background-color: $color-white;
      &:last-child {
        margin-bottom: 0;
      }
      @media (max-width: 768.89px) {
        margin-bottom: 0.5rem;
        line-height: 2.4rem;
        font-size: 0.8rem;
      }
      .icon {
        margin-right: 0.8rem;
        height: 1.1rem;
        vertical-align: -0.1rem;
        @media (max-width: 768.89px) {
          margin-right: 0.5rem;
          height: 0.8rem;
        }
      }
    }
    .btn-color {
      @include btn-fill-color();
      line-height: 3.5rem;
      @media (max-width: 768.89px) {
        line-height: 2.5rem;
      }
    }
  }
}
</style>

