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

