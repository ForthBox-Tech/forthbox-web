<template>
  <div class="game-project page-wrap2">
    <ProjectSection :projectId="query.id" @init="onInit"></ProjectSection>
    <section class="main main-wrap2">
      <TabsFrame
        :tabs="[
          { text: $t('Game2.ProjectOverview'), name: 'Info' },
          { text: $t('Game2.Comments'), name: 'Comment' },
        ]"
        v-model="defaultTab"
        @tab-change="onTabChange"
      >
        <template #Info><Info :projectId="query.id" :project="project"></Info></template>
        <template #Comment><Comment :projectId="query.id" :project="project"></Comment></template>
      </TabsFrame>
    </section>
  </div>
</template>

<script>
import ProjectSection from '@/modules/ProjectSection.vue'
import TabsFrame from '@/layouts/TabsFrame.vue'
import Info from './project-modules/Info.vue'
import Comment from './project-modules/Comment.vue'

export default {
  components: {
    ProjectSection,
    TabsFrame,
    Info,
    Comment,
  },
  data() {
    return {
      defaultTab: '',

