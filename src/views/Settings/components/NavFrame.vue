<template>
  <main class="nav-frame">
    <div class="nav-wrap">
      <nav class="navs">
        <a
          v-for="nav in navs"
          :key="nav"
          :class="['item', current?.name == nav.name ? 'active' : '']"
          @click="onNav(nav)"
        >
          <img v-if="nav.icon" class="icon" :src="nav.icon" />
          <span>{{ nav.text }}</span>
        </a>
      </nav>
      <aside class="aside" v-if="aside && aside.text">
        <a class="aside-btn" @click="onAside">
          <img class="icon" v-if="aside.icon" :src="aside.icon" />
          <span>{{ aside.text }}</span>
        </a>
      </aside>
    </div>
    <slot :name="current.name || current.text"></slot>
  </main>
</template>

<script>
export default {
  name: 'NavFrame',
  props: {
    navs: Array,
    aside: Object,
  },
  data() {
    const current = this.navs[0] || ''
    this.$emit('nav-change', current)

    return {
      current,
    }
  },
  watch: {
    navs(navs) {
      const current = this.current || navs[0]
      if (current != this.current) {
        this.current = current
        this.$emit('nav-change', current)
      }
    },
  },
  methods: {
    onNav(nav) {
      this.current = nav
      this.$emit('nav-change', nav)
    },
    onAside() {
      this.current = this.aside
      this.$emit('aside-trigger')
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.nav-frame {
  display: flex;
  margin: 1.5rem 0 4rem;
  @media (max-width: 768.89px) {
    margin: 0.6rem 0 4rem;
    display: block;
  }
  .nav-wrap {
    display: flex;
    flex-direction: column;
    max-width: 12.5rem;
    min-width: 11rem;
    border-right: 0.05rem solid $color-border;
    @media (max-width: 768.89px) {
      margin-bottom: 1rem;
      max-width: none;
      min-width: none;
      border-right: 0 none;
    }
  }
  .navs {
    padding-right: 1.5rem;
    flex: 1;
    max-height: 30rem;
    overflow: hidden auto;
    @media (max-width: 768.89px) {
      padding-right: 0;
      white-space: nowrap;
      overflow: auto hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .item {
      display: block;
      padding: 0.5rem 1rem;
      line-height: 1.5rem;
      font-size: 0.8rem;
      border-radius: 0.4rem;
      cursor: pointer;
      @media (max-width: 768.89px) {
        display: inline-block;
        padding: 0.35rem 0.6rem 0.35rem 0.6rem;
        line-height: 1rem;
        font-size: 0.6rem;
      }
      &:hover {
        color: $color-blue;
      }
      &.active {
        background-color: #f2f2f2;
      }
      .icon {
        display: inline-block;
        margin-right: 0.7rem;
        width: 0.9rem;
        height: 0.9rem;
        vertical-align: -0.15rem;
        @media (max-width: 768.89px) {
          margin-right: 0.4rem;
          width: 0.75rem;
          height: 0.75rem;
          vertical-align: -0.2rem;
        }
      }
    }
  }
  .aside {
    margin-top: 3rem;
    @media (max-width: 768.89px) {
      margin-top: 0.5rem;
    }
    .aside-btn {
      display: block;
      padding: 0 1rem 0 1.2rem;
      line-height: 2.5rem;
      font-size: 0.8rem;
      cursor: pointer;
      &:hover {
        color: $color-blue;
      }
      .icon {
        position: relative;
        display: inline-block;
        margin-right: 0.7rem;
        width: 1rem;
        height: 0.75rem;
        font-size: 0;
        vertical-align: -0.1rem;
      }
    }
  }
}
</style>

