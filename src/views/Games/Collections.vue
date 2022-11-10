<template>
  <div class="game-collections">
    <Banners></Banners>
    <section class="main-wrap2">
      <h1 :class="['header', games.type]">
        <span class="text">{{ games.title }}</span>
      </h1>
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
import ProjectCard from '@/modules/ProjectCard.vue'
import Pagination from '@/components/Pagination.vue'
import initTriggerMixin from '@/mixins/init-trigger'

const GAMES_TYPE = {
  casual: {
    type: 'casual',
    title: '休闲游戏',
  },
  premium: {
    type: 'premium',
    title: '优质游戏',
  },
  blockchain: {
    type: 'blockchain',
    title: '区块链游戏',
  },
}

export default {
  name: 'Collections',
  components: {
    Banners,
    ProjectCard,
    Pagination,
  },
  data() {
    return {
      games: {},

      total: 0,
      pageSize: 12,
      pageNo: 1,

      list: [],
    }
  },
  mixins: [initTriggerMixin()],
  methods: {
    onJump(pageNo) {
      this.pageNo = pageNo
      this._getList()
    },

    onProject(project) {
      console.log('------onProject', project)
      // this.$router.push({
      //   path: '/game2/project',
      //   query: {
      //     id: project.ID,
      //     code: project.Symbol,
      //   },
      // })
    },

    async _getList() {
      const url = `${process.env.VUE_APP_API_FBOX2}/web/collections/get_list`
      const params = {
        category: '',
        type: '',
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
      this.total = 0
      this.pageNo = 1
      await this._getList()
    },
  },
  mounted() {
    const query = this.$route.query || {}
    const types = Object.keys(GAMES_TYPE)
    const type = types.includes(query.type) ? query.type : types[0]
    this.games = GAMES_TYPE[type]
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.game-collections {
  .header {
    height: 4.3rem;
    background: left center / auto 100% no-repeat;
    @media (max-width: 768.89px) {
      height: 3rem;
    }
    &.casual {
      background-image: url('~@/assets/page-games/page-collections/title-bg1.png');
    }
    &.premium {
      background-image: url('~@/assets/page-games/page-collections/title-bg2.png');
    }
    &.blockchain {
      background-image: url('~@/assets/page-games/page-collections/title-bg3.png');
    }
    .text {
      display: inline-block;
      margin: 2rem 0 0 3.65rem;
      line-height: 1.95;
      font-size: 1.2rem;
      color: $color-white;
      @media (max-width: 768.89px) {
        margin: 1.4rem 0 0 2.6rem;
        line-height: 2;
        font-size: 0.8rem;
      }
    }
  }
  .layout-grid-list {
    margin: 0.7rem 0 2rem;
    padding-top: 1.5rem;
    @media (max-width: 768.89px) {
      padding-top: 1rem;
    }
  }
}
</style>

