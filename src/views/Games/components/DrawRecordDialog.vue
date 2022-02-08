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

