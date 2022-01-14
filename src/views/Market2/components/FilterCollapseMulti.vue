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

