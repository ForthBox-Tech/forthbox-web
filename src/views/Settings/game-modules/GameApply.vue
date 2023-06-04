<template>
  <div class="settings-game-apply settings-content">
    <div class="row">
      <Input
        class="search"
        :icon="require('@/assets/comp-nav/icon-search.png')"
        placeholder="Search by collection, NFT or user"
        v-model.trim="keyword"
        @enter="onSearch"
      ></Input>
      <ProviderSelector class="provider-selector" v-model="provider"></ProviderSelector>
    </div>
    <div class="row">
      <GameTypeSelector class="game-type-selector" v-model="gameType"></GameTypeSelector>
    </div>
    <div class="projects">
      <ProjectCard class="project-card" v-for="item in list" :key="item"></ProjectCard>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import ProviderSelector from '@/views/Market2/components/ProviderSelector.vue'
import GameTypeSelector from '@/views/Market2/components/GameTypeSelector.vue'
import ProjectCard from '@/modules/ProjectCard.vue'

export default {
  name: 'GameApply',
  components: {
    Input,
    ProviderSelector,
    GameTypeSelector,
    ProjectCard,
  },
  props: {
    game: Object,
  },
  data() {
    return {
      keyword: '',
      gameType: '',
      provider: '',

      list: [],
    }
  },
  methods: {
    onSearch() {},

    _getList() {
      this.list = [1, 2, 3, 4, 5]
    },
  },
  created() {
    this._getList()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-game-apply {
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    .search {
      flex: 1;
      margin-right: 4rem;
    }
  }
  .projects {
    margin-top: -0.75rem;
    border-top: 0.05rem solid $color-border;
    padding: 2rem 0;
    .project-card {
      margin: 0 2.9% 2.9% 0;
      width: 31.4%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>

