<template>
  <div class="nft-detail-page">
    <div class="detail-main">
      <DetailImage class="cover" :image="contract.image"></DetailImage>
      <DetailBoard class="info" :name="contract.name">
        <div class="detail-tips">{{ $t('DeFi.Earn') }} {{ contract.earn }}</div>
        <div class="detail-box">
          <div class="overview">
            <div>
              {{ $t('DeFi.Total: ') }}{{ contract.totalNFTNum }}
              |
              {{ $t('DeFi.Last: ') }}{{ lastNFTNum }}
            </div>
            <div class="balance">{{ $t('DeFi.Balance: ') }}{{ balance }}</div>
          </div>
          <div class="amount">{{ contract.amount }}</div>
          <div class="lock-time">
            {{ $t('DeFi.LockUpTime') }}: {{ $t('DeFi.Duration', { time: contract.duration }) }}
          </div>
          <div class="btn-wrap">
            <Button :disabled="isApproved || lastNFTNum <= 0" loader :handler="onApprove">
              {{ $t('DeFi.Approve') }}
            </Button>
            <Button
              v-if="!isShowReward && !isShowGetReward"
              :disabled="!isApproved || lastNFTNum <= 0"
              loader
              :handler="onStake"
            >
              {{ $t('DeFi.Farm') }}
            </Button>
            <Button v-if="isShowReward" :disabled="true">
              {{ rewardText }}
            </Button>
            <Button v-if="isShowGetReward" loader :handler="onGetReward">
              {{ $t('DeFi.Redeem') }}
            </Button>
          </div>
        </div>
      </DetailBoard>
    </div>
    <div class="detail-note">
      <div class="title">{{ $t('DeFi.Staking') }}</div>
      <ul class="content">
        <li v-for="text in contract.texts" :key="text">{{ $t(text, { COIN: contract.coin }) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from '@/views/Market2/components/DetailImage.vue'
import DetailBoard from '@/views/Market2/components/DetailBoard.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { NFT } from '@/models/defi.model'
import ERC1155 from '@/web3/ERC1155'
import LockERC1155ExchangeNFT from '@/web3/LockERC1155ExchangeNFT'
import { createCountdown } from '@/common/js/utils'

const FANTASY_BOX_ID = 1
export default {
  name: 'NFTDetail',
  components: {
    Button,
    DetailImage,
    DetailBoard,
  },
  data() {
    return {
      isApproved: false,

      isShowReward: false,
      rewardText: this.$t('DeFi.Redeem'),

      isShowGetReward: false,

      balance: 0.0,

      contract: {},

      lastNFTNum: 0,
      tokenContract: null,
      defiContract: null,
      nftDefiInfo: null,
    }
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    //获取奖励
    async onGetReward() {
      this.isShowGetReward = true
      try {
        await this.defiContract.exit()
        await this.getBalance()
        await this.getNftDefiInfo()
      } catch (err) {
        console.error(err)
      }
      this.isShowGetReward = false
      this.isShowReward = false
    },
    // 获取fbx余额
    async getBalance() {
      let balance = 0
      try {
        balance = await this.tokenContract.balanceof(cWebModel.mAccount, FANTASY_BOX_ID)
      } catch (err) {
        console.warn(err)
      }
      this.balance = parseFloat(balance).toFixed(2)
    },
    // 获取授权状态
    async getApprove() {
      let result = false
      try {
        result = await this.tokenContract.isApprovedForAll(
          cWebModel.mAccount,
          this.defiContract._contractAddress
        )
      } catch (err) {
        console.warn(err)
      }
      this.isApproved = result
    },

