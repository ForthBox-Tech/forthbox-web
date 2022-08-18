<template>
  <Dialog class="dialog-metabull dialog-invite-record" :visible="visible" @hide="onHide">
    <main class="main">
      <a class="close" @click="onHide"></a>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>My invited friend</th>
              <th>Number of Votes</th>
              <th>Hashrate increased</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item">
              <td>{{ index + 1 }}</td>
              <td>{{ item.friend }}</td>
              <td>{{ item.votes }}</td>
              <td>{{ item.hashrate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import { PROMO_METABULL } from '@/web3/contract.constant'
import FBXMetaBullOnLineHelp from '@/web3/FBXMetaBullOnLineHelp'

export default {
  name: 'InviteRecordDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      visible: false,

