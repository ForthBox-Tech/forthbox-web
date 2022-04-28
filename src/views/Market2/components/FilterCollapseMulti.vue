<template>
  <div class="filter-collapse-multi" v-if="list.length">
    <div class="header" @click="onToggle">
      <span class="title">{{ title }}</span>
      <span :class="['trigger', visible ? 'active' : '']"></span>
    </div>
    <div v-if="visible">
      <FilterCollapse
        class="filter-collapse-inner"
        v-for="filter in list"
        :key="filter"
        :type="type"
        :title="filter.title"
        :list="filter.list"
        v-model="filter.value"
        @change="onFilterChange"
      ></FilterCollapse>
    </div>
  </div>
</template>

<script>
import FilterCollapse from './FilterCollapse.vue'

export default {
  name: 'FilterCollapseMulti',
  components: {
    FilterCollapse,
  },
  props: {
    type: {
      /**
       * @type {'radio' | 'checkbox'}
       */
      type: String,
      default: 'checkbox',
    },
    title: String,
    /**
     * @type {string[] | { text: string, value: string }[]}
     */
    list: Array,
    /**
     * @type {string[]}
     */
    modelValue: Array,
    defaultUnfold: Boolean,
  },
  data() {
    return {
      visible: this.defaultUnfold || false,
    }
  },
  watch: {
    modelValue(values) {
      this.list.forEach((item, index) => {
        item.value = values[index] || []
      })
    },
  },
  methods: {
    onToggle() {
      this.visible = !this.visible
    },

    onFilterChange() {
      const data = this.list.map((item) => item.value)
      this.$emit('update:modelValue', data)
      this.$emit('change', data)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.filter-collapse-multi {
  padding: 0.5rem 0;
  line-height: 1.8rem;
  font-size: 0.7rem;
  border-bottom: 0.05rem solid $color-border;
  .header {
    display: flex;
    .title {
      flex: 1;
    }
    .trigger {
      position: relative;
      width: 2rem;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%) rotate(45deg);
        display: block;
        width: 0.4rem;
        height: 0.4rem;
        border-bottom: 0.1rem solid $color-secondary;
        border-right: 0.1rem solid $color-secondary;
      }
      &.active {
        &::before {
          transform: translate(-50%, -30%) rotate(-135deg);
        }
      }
    }
  }
  .filter-collapse-inner {
    &:last-child {
      border-bottom: 0 none;
    }
  }
}
</style>

