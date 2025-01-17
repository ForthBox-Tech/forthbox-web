<template>
  <div class="setting-notice">
    <h1 class="notice-title">公告</h1>
    <section class="tabs-wrap main-wrap2">
      <nav class="tabs">
        <a
          v-for="item in tabs"
          :key="item"
          :class="['tab', item == tab ? 'active' : '']"
          @click="onTab(item)"
        >
          {{ item }}
        </a>
      </nav>
    </section>
    <section class="main main-wrap2">
      <h2 class="title">{{ tab }}</h2>
      <ul class="list">
        <li class="item" v-for="item in list" :key="item.text">
          <span class="text">{{ item.text }}</span>
          <span class="date">{{ item.date }}</span>
        </li>
      </ul>
      <div class="btns">
        <a class="btn-more">查看更多</a>
      </div>
    </section>
  </div>
</template>

<script>
const TABS = ['综合', '上新公告', '盲盒公告', '活动公告', '系统公告']

export default {
  name: 'Notice',
  components: {},
  data() {
    return {
      tabs: TABS,
      tab: TABS[0],

      list: [],
    }
  },
  methods: {
    onTab(tab) {
      this.tab = tab
    },

    _getList() {
      this.list = [
        {
          text: '【iBox上新公告】「太初星」「洪荒谷」系列藏品《貔貅》白名单',
          date: '2022-08-16 18:15',
        },
        {
          text: '【iBox上新公告】「太初星」「洪荒谷」系列藏品《貔貅》白名单',
          date: '2022-08-16 18:15',
        },
        {
          text: '【iBox上新公告】「太初星」「洪荒谷」系列藏品《貔貅》白名单',
          date: '2022-08-16 18:15',
        },
      ]
    },
  },
  created() {
    this._getList()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.setting-notice {
  .notice-title {
    margin: 3.5rem 0 2.5rem;
    font-size: 1.2rem;
    font-weight: normal;
  }
  .tabs-wrap {
    margin-bottom: 0;
  }
  .tabs {
    .tab {
      margin-right: 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      &:not(:first-child)::before {
        content: '';
        margin-right: 1rem;
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: #e9e9e9;
      }
      &.active {
        color: $color-purple;
      }
    }
  }
  .main {
    margin-top: 2rem;
    box-sizing: border-box;
    padding: 1.5rem 1.5rem 2rem;
    box-shadow: 0 0 0.6rem 0.05rem rgba(91, 92, 97, 0.16);
    border-radius: 0.3rem;
    .title {
      padding: 0 1rem;
      font-size: 2.4rem;
      font-weight: normal;
    }
    .list {
      margin: 1.5rem 0 2rem 0;
    }
    .item {
      display: flex;
      padding: 3rem 2rem 1rem;
      line-height: 1.5;
      border-bottom: 0.1rem solid $color-border;
      cursor: pointer;
      &:hover {
        color: $color-blue;
      }
      .text {
        flex: 1;
        margin-right: 1rem;
        @include ellipsis(1);
      }
    }
    .btns {
      text-align: center;
    }
    .btn-more {
      display: inline-block;
      width: 15rem;
      line-height: 4rem;
      text-align: center;
      font-size: 0.9rem;
      color: $color-purple;
      border: 0.05rem solid $color-purple;
      border-radius: 4rem;
    }
  }
}
</style>

