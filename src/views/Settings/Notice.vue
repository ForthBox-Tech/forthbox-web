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

