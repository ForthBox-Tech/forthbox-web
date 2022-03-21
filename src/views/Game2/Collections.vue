<template>
  <div class="game-collections">
    <Banners></Banners>
    <section class="main-wrap2">
      <div class="condition">
        <GameTypeSelector
          class="game-type-selector"
          v-model="gameType"
          @change="onChangeFilter"
        ></GameTypeSelector>
        <ProviderSelector
          class="provider-selector"
          v-model="provider"
          @change="onChangeFilter"
        ></ProviderSelector>
      </div>
      <div class="layout-grid-list">
        <ProjectCard
          class="project-card"
          v-for="item in list"
          :key="item.name"
          :project="item"
          @click="onProject(item)"
        ></ProjectCard>
      </div>
      <div class="pagination-wrap" v-if="total > pageSize">
        <Pagination :total="total" :size="pageSize" :current="pageNo" @jump="onJump"></Pagination>
      </div>
    </section>
  </div>
</template>

<script>
import Banners from '@/views/Game2/collections-modules/Banners.vue'
import GameTypeSelector from '@/views/Market2/components/GameTypeSelector.vue'
import ProviderSelector from '@/views/Market2/components/ProviderSelector.vue'
import ProjectCard from '@/modules/ProjectCard.vue'
import Pagination from '@/components/Pagination.vue'
import initTriggerMixin from '@/mixins/init-trigger'

export default {
  name: 'Collections',
  components: {
    Banners,
    GameTypeSelector,
    ProviderSelector,
    ProjectCard,
    Pagination,
  },
  data() {
    return {
      gameType: '',
      provider: '',

      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  mixins: [initTriggerMixin()],
  methods: {
    onChangeFilter() {
      this.pageNo = 1
      this._getList()
    },
    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onProject(project) {
      this.$router.push({
        path: '/game2/project',
        query: {
          id: project.ID,
          code: project.Symbol,
        },
      })
    },

    async _getList() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/collections/get_list`
      const params = {
        category: this.gameType || '',
        type: this.provider || '',
        isGame: 1,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      const res = await this.$axios.get(url, { params })
      if (res.code != 200) {
        this.total = 0
        this.list = []
        console.warn(res.msg)
        return
      }

      const data = res.data || {}
      this.total = data.Total || 0
      this.list = data.List || []
    },
    async init() {
      this.gameType = ''
      this.provider = ''

      this.total = 0
      this.pageNo = 1
      await this._getList()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-collections {
  .condition {
    margin: 2.5rem 0 0;
    display: flex;
    @media (max-width: 768.89px) {
      margin: 0.5rem 0 1rem;
      display: block;
    }
    .game-type-selector {
      flex: 1;
      @media (max-width: 768.89px) {
        margin-bottom: 0.2rem;
      }
    }
  }
  .layout-grid-list {
    margin: 0.7rem 0 2rem;
    border-top: 0.05rem solid $color-border;
    padding-top: 1.5rem;
    @media (max-width: 768.89px) {
      padding-top: 1rem;
    }
  }
}
</style>

