<template>
  <Dialog class="dialog-metabull dialog-about-pool" :visible="visible" @hide="onHide">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <h1 class="title">About Prize Pools:</h1>
      <div class="content">
        <p>
          1.My Hashrate = the number of votes by you*10 + the number of votes by the friends you
          invited*6
        </p>
        <p>2.Team Hashrates = The total Hashrates of all users that vote for the team</p>
        <p>3.Estimated reward = Team Prize Pool*My Hashrate/Team Hashrates</p>
        <p>4.The reward for each user (address) is limited to 10,000 FBX</p>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'AboutPoolDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },

    onHide() {
      this.hide()
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-about-pool {
  .main {
    width: 30rem;
    @media (max-width: 768.89px) {
      width: 15rem;
    }
  }
  .content {
    margin-top: 1.2em;
    line-height: 1.5;
    p {
      margin-bottom: 0.4em;
    }
  }
}
</style>

