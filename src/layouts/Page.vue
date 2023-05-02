<template>
  <div class="fb-main" v-bind="$attrs">
    <div class="fb-sidebar">
      <div class="sidebar-links">
        <router-link
          :class="['sidebar-link', $route.path === '/minting' ? 'active' : '']"
          to="/minting"
        >
          <img class="icon" src="@/assets/comp-page/sidebar-nft-cast.png" />
          <span class="text">{{ $t('SideTab.Minting') }}</span>
        </router-link>
        <router-link
          :class="['sidebar-link', $route.path.indexOf('/defi') > -1 ? 'active' : '']"
          to="/defi"
        >
          <img class="icon" src="@/assets/comp-page/sidebar-defi-economics.png" />
          <span class="text">{{ $t('SideTab.DeFi') }}</span>
        </router-link>
        <router-link
          :class="['sidebar-link', $route.path.indexOf('/market') > -1 ? 'active' : '']"
          to="/market"
        >
          <img class="icon" src="@/assets/comp-page/sidebar-nft-market.png" />
          <span class="text">{{ $t('SideTab.Market') }}</span>
        </router-link>
        <router-link
          :class="['sidebar-link', $route.path.indexOf('/game2') > -1 ? 'active' : '']"
          to="/game2"
        >
          <img class="icon" src="@/assets/comp-page/sidebar-gamefi-center.png" />
          <span class="text">{{ $t('SideTab.Games') }}</span>
        </router-link>
      </div>

      <div class="sidebar-overview">
        <div class="row">
          <div class="label">{{ $t('SideTab.TotalFbxCirculation') }}</div>
          <div class="text">{{ fbxCirculation }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('SideTab.FbxDestroyed') }}</div>
          <div class="text">{{ fbxDestroyed }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('SideTab.FbxPrice') }}</div>
          <div class="text">{{ fbxPrice }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('SideTab.MonthlyYield') }}</div>
          <div class="text">{{ monthlyReturns }}</div>
        </div>
        <div class="row">
          <div class="label">{{ $t('SideTab.MonthlyCompoundInterest') }}</div>
          <div class="text">{{ monthlyCompoundInterest }}</div>
        </div>
      </div>
    </div>

    <div :class="['fb-page', forbid || loading || maintain ? 'overflow-hidden' : '']">
      <slot v-if="!forbid"></slot>
      <div class="page-forbid" v-if="forbid">
        <ComingSoon></ComingSoon>
      </div>
      <div class="page-loading" v-if="loading">
        <img src="@/assets/comp-page/loading.gif" />
      </div>
      <div class="page-maintain" v-if="maintain">
        <div>Server maintenance</div>
      </div>
    </div>
  </div>
  <Countdown :forceVisible="timerVisible" @close="onClose"></Countdown>
</template>

<script>
import emitter from '@/common/js/emitter'
import ERC20 from '@/web3/ERC20'
import ERC20Defi from '@/web3/ERC20Defi'
import { getFbxContract } from '@/web3/contract.factory'
import ComingSoon from '@/modules/ComingSoon.vue'
import Countdown from '@/modules/Countdown.vue'
import { isOpen } from '@/helpers/timer.helper'

/**
 * 复利计算
 */
function repeatInvest(fbxPrice, sumHashrate, days, investMoney) {
  const sumFbxOutRi = 100000 / 2
  const sumCount = days * 2
  const coeSuanLi = 10

  let personSuanLi = investMoney * coeSuanLi
  sumHashrate = sumHashrate + personSuanLi
  let sumWeiYang = investMoney

  let yuE = 0
  for (let it = 0; it < sumCount; it++) {
    const Li = (personSuanLi / sumHashrate) * sumFbxOutRi * fbxPrice
    const weiYangLi = sumWeiYang / 30 / 2
    sumWeiYang = sumWeiYang - weiYangLi
    if (sumWeiYang <= 0) sumWeiYang = 0
    const allLi = Li + weiYangLi
    yuE = yuE + allLi
    if (yuE > 20) {
      allLi = yuE - (yuE % 20)
      yuE = yuE - allLi
    } else {
      allLi = 0
    }
    sumWeiYang = sumWeiYang + allLi
    personSuanLi = personSuanLi + coeSuanLi * allLi
    sumHashrate = sumHashrate + coeSuanLi * allLi
  }

  return personSuanLi / coeSuanLi / investMoney
}

async function geteRC20DefiTotalRewardAlready() {
  var tWeb3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))
  var abi = [
    {
      inputs: [],
      name: 'totalRewardAlready',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]
  var calLpPriceContract = '0x75523248d4119204af918075fbb03c6F0fa6054b'
  var tContract = new tWeb3.eth.Contract(abi, calLpPriceContract)
  var re = await tContract.methods.totalRewardAlready().call()
  calLpPriceContract = '0x3cCcCA2Dd94896Df49d7EC0082F1525edb6c84C5'
  tContract = new tWeb3.eth.Contract(abi, calLpPriceContract)
  var re2 = await tContract.methods.totalRewardAlready().call()

  var totalReward = window.web3.utils.fromWei(re, 'ether')
  var totalReward2 = window.web3.utils.fromWei(re2, 'ether')
  var total = Math.round(totalReward * 100) / 100 + Math.round(totalReward2 * 100) / 100
  return total
}

async function getFighterCirculate() {
  let fbxAddr = '0xFD57aC98aA8E445C99bc2C41B23997573fAdf795'
  let commentManageAddr = '0x470591DEdd6BEB69F253DD0361f673fb009EbF30'
  let spacewarFBXAddr = '0x4b36e79dA805D6d4178Cb02262dbCB398e66395F'

  let fbxContract = new ERC20(fbxAddr)
  let commentManageContract = new ERC20Defi(commentManageAddr)

  try {
    var lastFbx = await fbxContract.balanceof(spacewarFBXAddr)
    var totalRewardAlready = await commentManageContract.totalRewardAlready()
    var sum = 60000000 + parseFloat(totalRewardAlready) - lastFbx
    return sum > 0 ? sum : 0
  } catch (err) {
    console.log(err)
  }
  return 0
}

let timerVisible = !isOpen()

export default {
  components: {
    ComingSoon,
    Countdown,
  },
  props: {
    loading: Boolean,
    forbid: Boolean,
  },
  data() {
    return {
      timerVisible,

      maintain: false,

      // 总流通量
      fbxCirculation: 0,
      // 总销毁量
      fbxDestroyed: 0,
      // fbx价格
      fbxPrice: 0,
      // 年化利率
      monthlyReturns: 0,
      // 月复利
      monthlyCompoundInterest: 0,
    }
  },
  methods: {
    onClose() {
      timerVisible = false
    },

    async init() {
      const fbxDestroyed = await this.fbxContract.totalDestroy()
      this.fbxDestroyed = Math.round(fbxDestroyed * 100) / 100 || 0

      const nftParameters = await cNFTFun.getParameters()
      const fbxPrice = Math.round(nftParameters.fbxPrice * 10000) / 10000 || 0
      this.fbxPrice = fbxPrice

      const totalSupply = await this.fbxContract.totalSupply()
      const fbxNftParameters = await cFBX_NFTFun.getParameters()

      const totalErc20DefiReward = await geteRC20DefiTotalRewardAlready()
      const fighterCirculate = await getFighterCirculate()
      const fbxCirculation =
        Math.round(totalSupply) +
        Math.round(fbxNftParameters.totalRewardAlready) -
        this.fbxDestroyed +
        totalErc20DefiReward +
        fighterCirculate
      this.fbxCirculation = Math.round(fbxCirculation * 100) / 100 || 0

