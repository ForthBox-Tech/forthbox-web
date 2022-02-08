<template>
  <section class="filter-frame">
    <header class="header">
      <h2 class="title">
        <img class="icon" src="@/assets/page-market2/comp-filter/icon-filter.png" />
        <span class="text">{{ $t('CompFilter.Filters') }}</span>
      </h2>
      <a class="btn-clear" @click="onClear">{{ $t('CompFilter.ClearAll') }}</a>
    </header>
    <template v-for="(item, index) in iFilters" :key="item">
      <FilterPrice
        v-if="item.name == 'price'"
        v-model="item.value"
        @change="onFilterChange"
      ></FilterPrice>
      <FilterCollapseMulti
        v-else-if="item.name == 'nftLevel'"
        :title="item.title"
        :list="item.list"
        :defaultUnfold="index < 1"
        v-model="item.value"
        @change="onFilterChange"
      ></FilterCollapseMulti>
      <FilterCollapse
        v-else
        :title="item.title"
        :list="item.list"
        :defaultUnfold="index < 1"
        :type="item.type || 'radio'"
        v-model="item.value"
        @change="onFilterChange"
      ></FilterCollapse>
    </template>
  </section>
</template>

<script>
import FilterPrice from './FilterPrice.vue'
import FilterCollapse from './FilterCollapse.vue'
import FilterCollapseMulti from './FilterCollapseMulti.vue'

export default {
  name: 'FilterFrame',
  components: {
    FilterPrice,
    FilterCollapse,
    FilterCollapseMulti,
  },
  props: {
    filters: Array,
    modelValue: Object,
    getDegreeFilter: Function,
    getNameFilter: Function,
  },
  data() {
    return {
      iFilters: [],
    }
  },
  computed: {
    filter: {
      get() {
        return this.modelValue || {}
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  watch: {
    filters(val) {
      this.iFilters = val
      this.iFilters.forEach(async (item) => {
        if (item.name === 'nftLevel') {
          if (typeof this.getDegreeFilter === 'function') {
            const res = await this.getDegreeFilter()
            this._handleDegreeFilter(item, res)
          }
        } else if (item.name === 'nftName') {
          if (typeof this.getNameFilter === 'function') {
            const res = await this.getNameFilter()
            this._handleNameFilter(item, res)
          }
        }
      })

      clearTimeout(this._filterTimeout)
      this.filter = {}
    },
  },
  methods: {
    onClear() {
      this.iFilters.forEach((item) => {
        item.value = []
      })

      clearTimeout(this._filterTimeout)
      this.filter = {}
    },
    onFilterChange() {
      const filter = {}
      this.iFilters.forEach((item) => {
        const value = item.value || []
        if (item.name === 'price') {
          const min = value[0] || ''
          const max = value[1] || ''
          const unit = value[2] || {}
          filter.minPrice = min
          filter.maxPrice = max
          filter.erc20Type = ((min || max) && unit.text) || ''
        } else if (item.name === 'contractType') {
          filter.contractType = value[0] || ''
        } else if (item.name === 'nftLevel') {
          filter.degreeName = item.list
            .reduce((prev, current) => {
              const temp = (current.value || []).map((result) => `${current.contract}$${result}`)
              return (prev || []).concat(temp)
            }, [])
            .join(',')
        } else if (item.name === 'status') {
          filter.showStatus = value[0] || ''
        } else if (item.name === 'last') {
          filter.minTimeDelta = value[0] || ''
        } else if (item.name === 'swapType') {
          filter.swapType = value[0] || ''
        } else if (item.name === 'nftName') {
          filter.nftConfigId = value.join(',') || ''
        }
      })

