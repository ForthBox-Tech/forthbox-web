<template>
  <DataPanel
    class="fbx-price"
    :list="[{ label: $t('SideTab.FbxPrice'), value: fbxPrice }]"
  ></DataPanel>
  <DataPanel
    :list="[
      { label: $t('SideTab.TotalFbxCirculation'), value: fbxCirculation },
      { label: $t('SideTab.FbxDestroyed'), value: fbxDestroyed },
      { label: $t('SideTab.MonthlyYield'), value: monthlyReturns },
      { label: $t('SideTab.MonthlyCompoundInterest'), value: monthlyCompoundInterest },
    ]"
  >
  </DataPanel>
</template>

<script>
import emitter from '@/common/js/emitter'
import ERC20Defi from '@/web3/ERC20Defi'
import { getFbxContract } from '@/web3/contract.factory'
import DataPanel from './DataPanel.vue'
import { formatDigits } from '@/common/js/utils'

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
  const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))
  const abi = [
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
  const calLpPriceAddr1 = '0x75523248d4119204af918075fbb03c6F0fa6054b'
  const calLpContract1 = new web3.eth.Contract(abi, calLpPriceAddr1)
  const re = await calLpContract1.methods.totalRewardAlready().call()
  const totalReward = web3.utils.fromWei(re, 'ether')

  const calLpPriceAddr2 = '0x3cCcCA2Dd94896Df49d7EC0082F1525edb6c84C5'
  const calLpContract2 = new web3.eth.Contract(abi, calLpPriceAddr2)
  const re2 = await calLpContract2.methods.totalRewardAlready().call()
  const totalReward2 = web3.utils.fromWei(re2, 'ether')

  const total = Math.round(totalReward * 100) / 100 + Math.round(totalReward2 * 100) / 100
  return total
}

async function getFighterCirculate() {
  const commentManageAddr = '0x470591DEdd6BEB69F253DD0361f673fb009EbF30'
  const spacewarFBXAddr = '0x4b36e79dA805D6d4178Cb02262dbCB398e66395F'

  const fbxContract = getFbxContract()
  const commentManageContract = new ERC20Defi(commentManageAddr)

  try {
    const lastFbx = await fbxContract.balanceof(spacewarFBXAddr)
    const totalRewardAlready = await commentManageContract.totalRewardAlready()
    const sum = 60000000 + parseFloat(totalRewardAlready) - lastFbx
    return sum > 0 ? sum : 0
  } catch (err) {
    console.log(err)
  }
  return 0
}

export default {
  components: {
    DataPanel,
  },
  data() {
    return {
      // fbx价格
      fbxPrice: 0,
      // 总流通量
      fbxCirculation: 0,
      // 总销毁量
      fbxDestroyed: 0,
      // 年化利率
      monthlyReturns: 0,
      // 月复利
      monthlyCompoundInterest: 0,
    }
  },
  methods: {
    async init() {
      const _fbxDestroyed = await this.fbxContract.totalDestroy()
      const fbxDestroyed = Math.round(_fbxDestroyed * 100) / 100 || 0
      this.fbxDestroyed = formatDigits(fbxDestroyed)

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
        fbxDestroyed +
        totalErc20DefiReward +
        fighterCirculate
      this.fbxCirculation = formatDigits(Math.round(fbxCirculation * 100) / 100 || 0)

      const hashrateUnit = 200 / 20 // 单位投资获得算力
      const hashrateAmount = Math.round(fbxNftParameters.totalSupply)
      const yieldMonth = 100000 * 30 // fbx月产量
      const monthlyReturns = (yieldMonth * fbxPrice * hashrateUnit) / hashrateAmount + 1
      this.monthlyReturns = formatDigits(Math.round(monthlyReturns * 10000) / 100) + '%'

      const days = 30 //不变
      const investMoney = 10000 //不变
      const monthlyCompoundInterest = repeatInvest(fbxPrice, hashrateAmount, days, investMoney)
      this.monthlyCompoundInterest =
        formatDigits(Math.round(monthlyCompoundInterest * 10000) / 100) + '%'
    },
  },
  mounted() {
    this._init = () => {
      this.fbxContract = getFbxContract()

      window.cNFTFun.connectToContract()
      window.cFBX_NFTFun.connectToContract()

      return this.init()
    }

    emitter.on('connect-wallet', this._init)
  },
  unmounted() {
    emitter.off('connect-wallet', this._init)
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.fbx-price {
  padding: 0.5rem 1rem;
  @media (max-width: 1200px) {
    box-sizing: border-box;
    width: 100%;
    padding: 0.6rem 0.4rem 0.5rem;
    margin-bottom: 0.05rem;
  }
  .value {
    font-size: 1.5rem;
    color: $color-purple;
    @media (max-width: 768.89px) {
      font-size: 1.3rem;
    }
  }
}
</style>
