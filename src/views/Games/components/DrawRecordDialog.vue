<template>
  <Dialog class="dialog-draw-record" :visible="visible">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <h1 class="title">领奖记录</h1>
      <table class="table">
        <tr class="head">
          <th>奖品</th>
          <th>领取时间</th>
        </tr>
        <tr class="row" v-for="row in data" :key="row">
          <td>{{ row.prize }}</td>
          <td>{{ row.time }}</td>
        </tr>
      </table>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'DrawRecordDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,

      data: [
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
        { prize: 'NFT * 1', time: '2022-09-16 17:30:37' },
      ],
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

    init() {},
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.dialog-draw-record {
  .main {
    padding: 0.6em 1em 1em;
    width: 23rem;
    line-height: 1.6;
    font-size: 1rem;
    color: $color-white;
    background: linear-gradient(92deg, #dc00ff 0%, #980fff 100%);
    border: 0.1em solid $color-white;
    border-radius: 1em;
    @media (max-width: 768.89px) {
      width: 14rem;
      font-size: 0.8rem;
    }
  }
  .close {
    position: absolute;
    top: -1.5rem;
    right: -2rem;
    z-index: 10;
    display: block;
    width: 2rem;
    height: 2rem;
    background: url('~@/assets/page-games/common/close.png') center center / 1.2rem no-repeat;
    cursor: pointer;
    @media (max-width: 768.89px) {
      right: -1.5rem;
    }
  }
  .title {
    font-size: 1.3em;
  }
  .table {
    margin-top: 0.7em;
    width: 100%;
    line-height: 2.2;
    background-color: #6300c2;
    border-collapse: collapse;
    border: 0.05rem solid #5605a4;
    border-radius: 0.5em;
    overflow: hidden;
    .head {
      font-size: 1em;
      background-color: #821991;
    }
    .row {
      font-size: 0.9em;
    }
    th,
    td {
      padding: 0 0.5em;
      border: 0.05rem solid #5605a4;
    }
  }
}
</style>

