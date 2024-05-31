<template>
  <Nav2></Nav2>
  <main class="page-minting">
    <section class="output">
      <div class="layout">
        <div class="layout-left"></div>
        <div class="layout-right">
          <div class="wrap-1">
            <div class="multi">
              <div>
                <div class="num usdc">{{ output.repurchasePool }}</div>
                <div class="text">{{ $t('Dapp.RepurchasePool') }}</div>
              </div>
              <div class="line"></div>
              <div>
                <div class="num usdc">{{ output.prizePool }}</div>
                <div class="text">{{ $t('Dapp.PrizePool') }}</div>
              </div>
            </div>
          </div>
          <div class="wrap-4">
            <div class="block">
              <div class="num fbx">{{ output.totalMining }}</div>
              <div class="text">{{ $t('Dapp.TotalMining') }}</div>
            </div>
            <div class="block">
              <div class="num fbx">{{ output.dailyBasicOutput }}</div>
              <div class="text">{{ $t('Dapp.BasicDailyOutput') }}</div>
            </div>
            <div class="block">
              <div class="multi">
                <div>
                  <div class="num usdc">{{ output.fbxFeedUsdcPrice }}</div>
                </div>
                <div class="line"></div>
                <div>
                  <div class="num fbx">{{ output.fbxFeedFbxPrice }}</div>
                </div>
              </div>
              <div class="text">{{ $t('Dapp.FeedingRatio') }}</div>
            </div>
            <div class="block">
              <div class="num nft">{{ output.totalNft }}</div>
              <div class="text">{{ $t('Dapp.ToTalNFT') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="invitation">
      <div class="layout">
        <div class="layout-left"></div>
        <div class="layout-right">
          <div class="benefits">
            <img class="money" src="@/assets/page-minting/money.png" />
            <div>
              <div class="multi">
                <div class="flex">
                  <div class="value">{{ invitation.benefits[0] }}</div>
                  <div class="unit">USDC</div>
                </div>
                <div class="line"></div>
                <div class="flex">
                  <div class="value">{{ invitation.benefits[1] }}</div>
                  <div class="unit">FBX</div>
                </div>
              </div>
              <div class="text">{{ $t('Dapp.TotalCommission') }}</div>
            </div>
          </div>
          <div class="invite-person">
            <div class="value">{{ invitation.peoples }}</div>
            <div class="unit">PERSON</div>
            <div class="text">{{ $t('Dapp.TotalInvitedNumber') }}</div>
          </div>
          <div class="invite-text">
            {{ $t('Dapp.YouCanShareTheLinkToYourFriends') }}
          </div>
          <Button class="btn-invite" @click="$refs.shareDialog.show()">
            <span>{{ $t('Dapp.ShareLink') }}</span>
            <img class="icon" src="@/assets/page-minting/icon-share.png" />
          </Button>
        </div>
      </div>
    </section>
    <section class="mint">
      <div class="layout">
        <div class="layout-left data-panel">
          <FbxDataPanel></FbxDataPanel>
          <DataPanel
            :list="[
              { label: $t('Dapp.NetworkComputingPower'), value: power.whole },
              { label: $t('Dapp.MyComputingPower'), value: power.owner },
              {
                label: $t('Dapp.Earned'),
                value: power.earned,
                icon: require('@/assets/common/token-fbx.png'),
              },
            ]"
          >
            <Button class="btn-receive" loader :handler="onReceive">
              {{ $t('Dapp.ClaimRewards') }}
              <img class="icon" src="@/assets/page-minting/icon-receive.png" />
            </Button>
          </DataPanel>
        </div>
        <div class="mint-main">
          <div class="mint-content">
            <div class="overview">
              <div class="block">
                <img class="icon" src="@/assets/common/token-fbx.png" />
                <span class="text">{{ overview.fbx }}</span>
              </div>
              <div class="block">
                <img class="icon" src="@/assets/common/token-usdc.png" />
                <span class="text">{{ overview.usdc }}</span>
              </div>
              <div class="block">
                <img class="icon" src="@/assets/page-minting/icon-nft-1.png" />
                <span class="text">{{ (nfts && nfts.length) || 0 }}</span>
              </div>
              <div class="notice">
                <img class="icon" src="@/assets/page-minting/notice.png" />
                <span class="text">{{ $t('Dapp.Notice') }}:</span>
                <Notice>{{ $t('Dapp.NoticeMessage') }}</Notice>
              </div>
            </div>
            <div class="ham-wrap">
              <div class="ham-left">
                <a class="btn-switch" @click="onPrev">
                  <img class="img" src="@/assets/minting/slider-left.png" />
                </a>
              </div>
              <div class="ham-main">
                <div class="main-left">
                  <div class="inner">
                    <template v-if="nfts.length > 0">
                      <div class="nft-ham-more">
                        <a class="btn-more" @click="$refs.feedIntroDialog.show()">
                          <img class="img" src="@/assets/minting/explain.png" />
                          <span class="text">{{ $t('Dapp.Explain') }}</span>
                        </a>
                        <a
                          class="btn-more"
                          target="_blank"
                          href="https://medium.com/@forthboxofficial/feeding-instructions-f7b373421e16"
                        >
                          <img class="img" src="@/assets/minting/guide.png" />
                          <span class="text">{{ $t('Dapp.Guide') }}</span>
                        </a>
                      </div>
                      <div class="nft-ham-anubis">
                        <div class="anubis-name">Ham</div>
                        <div class="">#{{ currentNft.token }}</div>
                      </div>
                      <div class="nft-ham-center">
                        <img class="img" :src="currentNft.image" />
                      </div>
                      <div style="flex: 1"></div>
                      <div class="nft-ham-bottom">
                        <div class="exp">
                          <div>
                            {{ $t('Dapp.Progress') }}: {{ currentNft.level.exp }}/{{
                              currentNft.level.stage
                            }}
                          </div>
                          <div class="progress-wrap">
                            <div class="progress">
                              <div
                                class="progress-full"
                                :style="`width: ${
                                  (currentNft.level.exp / currentNft.level.stage) * 100
                                }%`"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <Button
                          class="btn-feed"
                          :disabled="isDisabledFeed(currentNft.lastUpdateTime)"
                          :loading="currentNft.isFeeding"
                          :handler="onFeed"
                        >
                          {{
                            currentNft.time
                              ? `${currentNft.time[1]}:${currentNft.time[2]}:${currentNft.time[3]}`
                              : $t('Dapp.Feed')
                          }}
                        </Button>
                      </div>
                    </template>
                    <template v-else>
                      <div class="empty-wrap">
                        <img class="empty-img" src="@/assets/minting/role-empty.png" />
                        <p class="empty-text">{{ $t('Dapp.StartMintingYourFirstAnimalGod') }}</p>
                        <Button class="empty-btn" loader :handler="onCreate">
                          {{ $t('Dapp.StartMinting') }}
                        </Button>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="main-right">
                  <div class="inner">
                    <template v-if="nfts.length > 0">
                      <Button
                        v-if="currentNft.token > 53121"
                        :class="['btn-prize', !hasPrize ? 'disabled' : '']"
                        :loader="true"
                        :handler="onShowPrizeDialog"
                      >
                        {{ prizeBtnText }}
                      </Button>
                      <div class="level">LEVEL {{ currentNft.level.lv }}</div>
                      <ul class="attr-list">
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-pow.png" />
                          <span class="attr-name">{{ $t('Dapp.ComputingPower') }}</span>
                          <span class="attr-value">{{ currentNft.property.pow }}</span>
                        </li>
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-int.png" />
                          <span class="attr-name">{{ $t('Dapp.INT') }}</span>
                          <span class="attr-value">{{ currentNft.property.int }}</span>
                        </li>
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-rich.png" />
                          <span class="attr-name">{{ $t('Dapp.Gold') }}</span>
                          <span class="attr-value">{{ currentNft.property.gold }}</span>
                        </li>
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-atk.png" />
                          <span class="attr-name">{{ $t('Dapp.CE') }}</span>
                          <span class="attr-value">{{ currentNft.property.ce }}</span>
                        </li>
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-dex.png" />
                          <span class="attr-name">{{ $t('Dapp.AGI') }}</span>
                          <span class="attr-value">{{ currentNft.property.agi }}</span>
                        </li>
                        <li class="attr-item">
                          <img class="attr-icon" src="@/assets/minting/attr-am.png" />
                          <span class="attr-name">{{ $t('Dapp.CHR') }}</span>
                          <span class="attr-value">{{ currentNft.property.chr }}</span>
                        </li>
                      </ul>
                      <Button
                        class="btn-stake"
                        v-if="!currentNft.isStaked"
                        :loading="currentNft.isStaking"
                        :handler="onStake"
                      >
                        {{ $t('Dapp.Stake') }}
                      </Button>
                      <Button
                        class="btn-redeem"
                        v-if="currentNft.isStaked"
                        :loading="currentNft.isRedeeming"
                        :handler="onRedeem"
                      >
                        {{ $t('Dapp.Redeem') }}
                      </Button>
                    </template>
                    <template v-else>
                      <img class="empty" src="@/assets/page-minting/attr-empty.png" />
                    </template>
                  </div>
                </div>
              </div>
              <div class="ham-right">
                <a class="btn-switch" @click="onNext">
                  <img class="img" src="@/assets/minting/slider-right.png" />
                </a>
              </div>
            </div>
          </div>
          <div class="ham-list">
            <div class="list">
              <div
                v-for="(nft, index) in nfts"
                :key="nft.token"
                :class="['item', currentIndex == index ? 'active' : '']"
                @click="onSelect(index)"
              >
                <div class="cover">
                  <img class="img" :src="nft.image" />
                </div>
                <div class="info">
                  <div class="level">LEVEL {{ nft.level.lv }}</div>
                  <div class="id">#{{ nft.token }}</div>
                  <div
                    class="time"
                    v-if="isDisabledFeed(nft.lastUpdateTime) && nft.time && nft.time.length > 0"
                  >
                    {{ `${nft.time[1]}:${nft.time[2]}:${nft.time[3]}` }}
                  </div>
                </div>
              </div>
              <div v-if="nfts.length == 0" class="item active empty">
                <img class="img" src="@/assets/page-minting/ham-empty.png" />
              </div>
            </div>
            <div class="create">
              <Button class="btn-create" loader :handler="onCreate">
                <img class="img" src="@/assets/minting/create-icon.png" />
                <span class="text">{{ $t('Dapp.MintAnimalGod') }}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <FeedAuthorDialog
    ref="feedAuthorDialog"
    v-model:fbxAuthor="feedAuthorDialog.fbxAuthor"
    v-model:usdcAuthor="feedAuthorDialog.usdcAuthor"
  ></FeedAuthorDialog>
  <FeedIntroDialog ref="feedIntroDialog"></FeedIntroDialog>
  <ShareDialog ref="shareDialog"></ShareDialog>
  <PrizeDialog
    :visible="prizeDialog.visible"
    :prize="prizeDialog.prize"
    @hide="onHidePrizeDialog"
  ></PrizeDialog>
  <PrizeExplainDialog ref="prizeExplainDialog"></PrizeExplainDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import Nav2 from '@/modules/Nav2.vue'
import ShareDialog from '@/modules/ShareDialog.vue'
import Notice from './modules/Notice.vue'
import DataPanel from './modules/DataPanel.vue'
import FbxDataPanel from './modules/FbxDataPanel.vue'
import FeedAuthorDialog from './modules/FeedAuthorDialog.vue'
import PrizeDialog from './modules/PrizeDialog.vue'
import PrizeExplainDialog from './modules/PrizeExplainDialog.vue'
import FeedIntroDialog from '../Home/modules/FeedIntroDialog.vue'
import { initNft, getNft, initNftList } from '@/models/ham.model'
import { isSupportedChain } from '@/web3/wallet'
import { NFT_HAM, STAKE_HAM } from '@/web3/contract.constant'
import { getFbxContract, getUsdcContract, getTowerContract } from '@/web3/contract.factory'
import emitter from '@/common/js/emitter'
import { createCountdown, formatDigits } from '@/common/js/utils'

/** nft喂养等待时间, 单位：ms */
const FEED_WAIT_TIEM = 12 * 60 * 60 * 1000
/** 定时器管理器 */
const timerManager = {
  list: [],
  add(timer) {
    timerManager.list.push(timer)
  },
  stop(timer) {
    timer && timer.stop && timer.stop()
  },
  clear() {
    timerManager.list.forEach((timer) => timer.stop())
    timerManager.list = []
  },
}
/** 添加计时器 */
function addTimer(nft) {
  timerManager.stop(nft.timer)
  const leftTime = parseInt(nft.lastUpdateTime + FEED_WAIT_TIEM - Date.now())
  if (leftTime < FEED_WAIT_TIEM && leftTime > 0) {
    nft.timer = createCountdown(leftTime / 1000, (time) => {
      nft.time = time
    })
    timerManager.add(nft.timer)
  }
  return nft
}

/** NFT操作 */
const NFT_ACTION = {
  /** 无操作 */
  NO: 0,
  /** 添加 */
  ADD: 1,
  /** 修改 */
  MODIFY: 2,
}

async function getBuyBackBonusUsdc() {
  const usdcContract = getUsdcContract()
  const sum1 = await usdcContract.balanceof('0x1889b2a2a07911e21683467be3714a1466D94Fe2')
  const sum2 = await usdcContract.balanceof('0x661D68d1AEa6FbDf3d6C04B579a1264e6FfDd580')
  const sum3 = await usdcContract.balanceof('0x08EB4e92F9312273e9c0a8C8e6931f584Bd6232C')
  const buyBack = Number(sum3) + Number(sum1) * 0.4 + 10626 + 150000 + 30000 + 8000
  const bonus = Number(sum2) + Number(sum1) * 0.1 + 19863.33 + 23000 + 47000 + 2000 + 25000
  return { buyBack, bonus }
}

export default {
  name: 'Minting',
  components: {
    Button,
    Nav2,
    Notice,
    DataPanel,
    FbxDataPanel,
    ShareDialog,
    PrizeExplainDialog,
    FeedAuthorDialog,
    FeedIntroDialog,
    PrizeDialog,
  },
  data() {
    return {
      overview: {
        fbx: 0,
        usdc: 0,
        notice: '',
      },
      output: {
        totalFeeding: 0,
        repurchasePool: 0,
        prizePool: 0,
        totalMining: 0,
        dailyBasicOutput: 56250,
        fbxFeedUsdcPrice: 0,
        fbxFeedFbxPrice: 0,
        totalNft: 0,
      },
      invitation: {
        benefits: [0, 0],
        peoples: 0,
      },

      nfts: [],
      currentIndex: 0,

      power: {
        whole: 0,
        owner: 0,
        profit: 0,
      },

      prizeList: 0,

      feedAuthorDialog: {
        fbxAuthor: false,
        usdcAuthor: false,
      },
      prizeDialog: {
        visible: false,
        prize: {
          image: '',
          texts: [],
        },
      },
    }
  },
  computed: {
    currentNft() {
      return this.nfts.length ? this.nfts[this.currentIndex] : getNft()
    },
    hasPrize() {
      return this.prizeList.length > 0
    },
    prizeBtnText() {
      const prizeList = this.prizeList || []
      const prizeIndex = prizeList[0] - 1 || 0
      const stages = [3, 6, 9, 11, 12, 13]
      const ham = this.currentNft
      let text = this.$t('Dapp.Claim') + stages[prizeIndex] + this.$t('Dapp.Reward')
      if (!this.hasPrize) {
        const stage = stages.find((stage) => ham.level.lv < stage)
        text = this.$t('Dapp.Unlock') + stage + this.$t('Dapp.Reward')
      }
      return text
    },
  },
  methods: {
    isDisabledFeed(feedTime) {
      return Date.now() - feedTime < FEED_WAIT_TIEM
    },

    async onShowPrizeDialog() {
      if (!this.hasPrize) {
        this.$refs.prizeExplainDialog.show()
        return
      }

      const ham = this.currentNft

      const turretContract = getTowerContract()
      await turretContract.mintOneFromHam(ham.token)

      const tokens = await turretContract.tokenOfOwner()
      if (!tokens.length) return

      const lastTurrectToken = tokens[tokens.length - 1]
      if (!lastTurrectToken) return

      const turret = await turretContract.tokenURI(lastTurrectToken)
      if (!turret) return

      // 领取一个之后，可领取数量减一
      this.prizeList.shift()

      Object.assign(this.prizeDialog, {
        visible: true,
        prize: {
          image: turret.image,
          texts: [
            this.$t('Dapp.Congratulations'),
            `${turret.degreeName || ''} NFT #${lastTurrectToken}`,
          ],
        },
      })
    },
    onHidePrizeDialog() {
      this.prizeDialog.visible = false
    },

    onFeed() {
      const index = this.currentIndex
      const nft = this.nfts[index]
      if (nft.isFeeding) return
      if (nft.isStaking || nft.isRedeeming) {
        alert(`ApeGod(${nft.token}) is ${nft.isStaking ? 'staking' : 'redeeming'}`)
        return
      }

      nft.isFeeding = true
      const fbxContract = getFbxContract()
      const usdcContract = getUsdcContract()
      return Promise.all([
        fbxContract.allowance(window.cWebModel.mAccount, NFT_HAM),
        usdcContract.allowance(window.cWebModel.mAccount, NFT_HAM),
      ])
        .then(([fbxAllowance, usdcAllowance]) => {
          this.feedAuthorDialog.fbxAuthor = parseInt(fbxAllowance) > 1000
          this.feedAuthorDialog.usdcAuthor = parseInt(usdcAllowance) > 1000
          if (this.feedAuthorDialog.fbxAuthor && this.feedAuthorDialog.usdcAuthor) {
            return window.cNFTFun
              .feed_Foth_FBX(nft.token)
              .then(() => this.init(index, NFT_ACTION.MODIFY))
          } else {
            this.$refs.feedAuthorDialog.show()
          }
        })
        .catch((err) => {
          console.warn(err)
          alert(`ApeGod(${nft.token}) feed fail`)
          return this.init(index, NFT_ACTION.MODIFY)
        })
        .then(() => {
          nft.isFeeding = false
        })
    },

    // 质押
    onStake() {
      const index = this.currentIndex
      const nft = this.nfts[index]
      if (nft.isStaking) return
      if (nft.isFeeding) {
        alert(`ApeGod(${nft.token}) is feeding`)
        return
      }

      const pow = nft.property.pow || 0
      if (pow <= 0) {
        return alert('please feed first')
      }

      nft.isStaking = true
      return window.cNFTFun
        .isApprovedForAll(window.cWebModel.mAccount, STAKE_HAM)
        .then((isApproved) => {
          let approval = Promise.resolve()
          if (!isApproved) {
            approval = window.cNFTFun.setApprovalForAll(STAKE_HAM, true)
          }
          return approval
        })
        .then(() => window.cFBX_NFTFun.stake(nft.token))
        .then(() => {
          nft.isStaked = true
          return this.init(index, NFT_ACTION.MODIFY)
        })
        .catch((err) => {
          console.warn(err)
          alert(`ApeGod(${nft.token}) stake fail`)
          return this.init(index, NFT_ACTION.MODIFY)
        })
        .then(() => {
          nft.isStaking = false
        })
    },
    // 赎回
    onRedeem() {
      const index = this.currentIndex
      const nft = this.nfts[index]
      if (nft.isRedeeming) return
      if (nft.isFeeding) {
        alert(`ApeGod(${nft.token}) is feeding`)
        return
      }

      nft.isRedeeming = true
      return window.cFBX_NFTFun
        .withdraw(nft.token)
        .then(() => {
          nft.isStaked = false
          return this.init(index, NFT_ACTION.MODIFY)
        })
        .catch((err) => {
          console.warn(err)
          alert(`ApeGod(${nft.token}) redeem fail`)
          return this.init(index, NFT_ACTION.MODIFY)
        })
        .then(() => {
          nft.isRedeeming = false
        })
    },

    onReceive() {
      const index = this.currentIndex

      return window.cFBX_NFTFun
        .getReward()
        .then(() => this.init(index, NFT_ACTION.NO))
        .catch((err) => {
          console.warn(err)
          alert('receive fail')
        })
    },

    // 铸造：cNFTFun.mintNFT
    // 带邀请者的铸造（分享页）：cNFTFun.mintNFT_AddInviter
    onCreate() {
      const index = this.currentIndex

      return window.cNFTFun
        .mintNFT()
        .then(() => this.init(index, NFT_ACTION.ADD))
        .catch(function (err) {
          console.warn(err)
          if (err && err == 'Error: bnberr') {
            alert('No BNB as gas fee')
          } else {
            alert('minting fail')
          }
        })
    },

    onPrev() {
      if (this.currentIndex <= 0) return
      this.select(this.currentIndex - 1)
    },
    onNext() {
      if (this.currentIndex >= this.nfts.length - 1) return
      this.select((this.currentIndex + 1) % this.nfts.length)
    },
    onSelect(index) {
      if (index == this.currentIndex) return
      this.select(index)
    },
    async select(index) {
      this.currentIndex = index

      const ham = this.nfts[index]
      const turretContract = getTowerContract()
      const levelPrizeList = await turretContract.mintFromHamLevelArr(ham.token)
      this.prizeList = levelPrizeList || 0
    },

    getNftList(index) {
      timerManager.clear()
      return Promise.all([
        window.cNFTFun.tokenOfOwner(),
        window.cFBX_NFTFun.getOwnerStakeTokenIDs(),
      ])
        .then(([nftTokens = [], stakedNftTokens = []]) => {
          const count = nftTokens.length + stakedNftTokens.length
          if (!count) {
            this.nfts = []
            return
          }

          return Promise.all([
            initNftList(nftTokens, false),
            initNftList(stakedNftTokens, true),
          ]).then(([nfts, stakedNfts]) => {
            const allNfts = [...nfts, ...stakedNfts]
              .map((nft) => ({
                ...nft,
                isFeeding: false,
                isStaking: false,
                isRedeeming: false,
              }))
              .sort((nft1, nft2) => nft2.token - nft1.token)

            this.nfts = allNfts
            this.nfts.forEach((nft) => addTimer(nft))
            if (this.nfts.length > 0) {
              this.select(index || 0)
            }
          })
        })
        .catch(() => {
          this.nfts = []
        })
    },
    addNft() {
      timerManager.clear()
      window.cNFTFun
        .tokenOfOwner()
        .then((nftTokens = []) => {
          const nftsPromise = []
          nftTokens.forEach((token) => {
            if (!this.nfts.find((nft) => nft.token == token)) {
              nftsPromise.push(initNft(token, false))
            }
          })
          if (!nftsPromise.length) return

          return Promise.all(nftsPromise).then((nfts) => {
            nfts = (nfts || [])
              .map((nft) => ({
                ...nft,
                isFeeding: false,
                isStaking: false,
                isRedeeming: false,
              }))
              .sort((nft1, nft2) => nft2.token - nft1.token)

            const currentNftToken = this.currentNft.token

            this.nfts = [...nfts, ...this.nfts]
            this.nfts.forEach((nft) => addTimer(nft))

            const index = this.nfts.findIndex((nft) => nft.token === currentNftToken)
            this.select(index >= 0 ? index : 0)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    refreshNft(index) {
      const nft = this.nfts[index]
      if (!nft || !nft.token) return Promise.resolve()

      return initNft(nft.token, nft.isStaked).then((_nft) => {
        if (_nft.token) {
          Object.assign(nft, _nft)
        }
        addTimer(nft)
        return nft
      })
    },
    async init(index, action) {
      if (!window.cWebModel.mConnected) return

      window.cNFTFun.connectToContract()
      window.cFBX_NFTFun.connectToContract()

      const fbxContract = getFbxContract()
      const fbxBalance = await fbxContract.balanceof()
      this.overview.fbx = formatDigits(parseFloat(fbxBalance).toFixed(2))

      const usdcContract = getUsdcContract()
      const usdcBalance = await usdcContract.balanceof()
      this.overview.usdc = formatDigits(parseFloat(usdcBalance).toFixed(2))

      const { buyBack, bonus } = await getBuyBackBonusUsdc()
      const nftParameters = await window.cNFTFun.getParameters()
      const fbxNftParameters = await window.cFBX_NFTFun.getParameters()

      Object.assign(this.output, {
        repurchasePool: formatDigits(Math.round(buyBack)),
        prizePool: formatDigits(Math.round(bonus)),

        totalFeeding: Math.round(nftParameters.totlaFeedUsdt),
        fbxFeedUsdcPrice: formatDigits(parseFloat(nftParameters.feedUsdcPrice).toFixed(2)),
        fbxFeedFbxPrice: formatDigits(parseFloat(nftParameters.feedFbxPrice).toFixed(2)),
        totalNft: formatDigits(Math.round(nftParameters.totalSupply)),

        dailyBasicOutput: formatDigits(Math.round(fbxNftParameters.basicDailyReward)),
        totalMining: formatDigits(Math.round(fbxNftParameters.totalRewardAlready * 100) / 100),
      })
      Object.assign(this.invitation, {
        peoples: Math.round(nftParameters.inviterNum),
        benefits: [
          formatDigits(Math.round(nftParameters.benefitsInvitationUSDC * 100) / 100),
          formatDigits(Math.round(nftParameters.benefitsInvitationFBX * 100) / 100),
        ],
      })
      Object.assign(this.power, {
        whole: formatDigits(Math.round(fbxNftParameters.totalSupply)),
        owner: formatDigits(Math.round(fbxNftParameters.balances)),
        earned: formatDigits(parseFloat(fbxNftParameters.earned).toFixed(2)),
      })

      switch (action) {
        case NFT_ACTION.NO:
          return
        case NFT_ACTION.ADD:
          return this.addNft()
        case NFT_ACTION.MODIFY:
          return this.refreshNft(index)
        default:
          return this.getNftList(index)
      }
    },
    reset() {
      Object.assign(this, {
        overview: {
          fbx: 0,
          usdc: 0,
          notice: '',
        },
        output: {
          totalFeeding: 0,
          repurchasePool: 0,
          prizePool: 0,
          totalMining: 0,
          dailyBasicOutput: 56250,
          fbxFeedUsdcPrice: 0,
          fbxFeedFbxPrice: 0,
          totalNft: 0,
        },
        invitation: {
          benefits: [0, 0],
          peoples: 0,
        },

        nfts: [],
        currentIndex: 0,

        power: {
          whole: 0,
          owner: 0,
          profit: 0,
        },
      })
    },
  },
  mounted() {
    this._init = async ({ accounts, chainId } = {}) => {
      if (!accounts || !accounts.length) {
        this.reset()
        return
      }
      if (!isSupportedChain(chainId)) {
        this.reset()
        alert('Please change your chain provider to the Binance Smart Chain (or testnet)')
        return
      }

      try {
        await this.init()
      } catch (err) {
        console.warn(err)
      }
    }
    emitter.on('connect-wallet', this._init)
    this.$root.connectWallet()
  },
  unmounted() {
    emitter.off('connect-wallet', this._init)
    timerManager.clear()
  },
}
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.page-minting {
  $max-width: 72rem;
  padding-bottom: 3rem;
  background-color: #f5f9ff;
  .layout {
    display: flex;
    max-width: $max-width;
    margin: 0 auto;
    padding: 2rem 0;
    line-height: 1.2;
    color: $color-primary;
    @media (max-width: 768.89px) {
      display: block;
      padding: 0.8rem 0;
    }
  }
  .layout-left {
    box-sizing: border-box;
    padding: 0 1.5rem 0 0;
    width: 13.5rem;
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .layout-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768.89px) {
      flex-wrap: wrap;
    }
  }

  .output {
    background-image: linear-gradient(90deg, #03a9ff 0%, #df01ff 100%);
    .layout {
      color: $color-white;
    }
    .layout-right {
      position: relative;
      align-items: flex-start;
      @media (max-width: 768.89px) {
        padding-bottom: 3rem;
      }
    }
    .wrap-1 {
      flex: 1;
      padding: 0 0.25rem;
      text-align: center;
      @media (max-width: 768.89px) {
        box-sizing: border-box;
        margin: 0.5rem 0;
        padding: 0 0.25rem;
        width: 100%;
      }
      .num {
        @media (max-width: 768.89px) {
          font-size: 1rem;
          font-family: 'itcavantgardestd-bold';
        }
      }
      .line {
        &::before {
          @media (max-width: 768.89px) {
            margin: 0.2rem 0.5rem 0;
            height: 1rem;
          }
        }
      }
    }
    .wrap-4 {
      flex: 2.6;
      display: flex;
      justify-content: space-between;
      @media (max-width: 768.89px) {
        position: absolute;
        top: 3.4rem;
        left: 50%;
        transform: translateX(-50%);
        flex: none;
        display: block;
        margin: 3% auto;
        width: 94%;
        padding: 0 0.6rem;
        box-sizing: border-box;
        color: $color-primary;
        background-color: $color-white;
        border-radius: 0.5rem;
      }
      .text {
        text-align: left;
      }
      .line {
        &::before {
          @media (max-width: 768.89px) {
            background-color: rgba($color-black, 0.1);
          }
        }
      }
    }
    .block {
      padding: 0 0.25rem;
      text-align: center;
      @media (max-width: 768.89px) {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0.6rem 0;
        width: 100%;
        border-bottom: 0.05rem solid rgba($color-border, 0.4);
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .multi {
      display: flex;
      @media (max-width: 768.89px) {
        justify-content: center;
      }
    }
    .num {
      font-size: 1rem;
      font-family: 'itcavantgardestd-bold';
      @media (max-width: 768.89px) {
        font-size: 0.7rem;
        font-weight: bold;
        font-family: inherit;
      }
      &::before {
        content: '';
        display: inline-block;
        margin-right: 0.25em;
        width: 1.4em;
        height: 1.4em;
        border-radius: 2em;
        background: rgba($color-black, 0.4) center center / 75% no-repeat;
        vertical-align: -0.3em;
        @media (max-width: 768.89px) {
          width: 1.3em;
          height: 1.3em;
        }
      }
      &.usdc::before {
        background-image: url('~@/assets/common/token-usdc.png');
      }
      &.fbx::before {
        background-image: url('~@/assets/common/token-fbx.png');
      }
      &.nft::before {
        background-color: transparent;
        background-image: url('~@/assets/page-minting/icon-nft.png');
        background-size: 100%;
      }
    }
    .text {
      line-height: 1.5;
      font-size: 0.7rem;
      @media (max-width: 768.89px) {
        flex: 1;
        order: -1;
        font-size: 0.65rem;
      }
    }
    .line {
      &::before {
        content: '';
        display: block;
        margin: 0.25rem 0.5rem 0;
        width: 0.05rem;
        height: 0.9rem;
        background-color: rgba($color-white, 0.5);
        @media (max-width: 768.89px) {
          margin: 0.15rem 0.5rem 0;
          height: 0.6rem;
        }
      }
    }
  }
  .invitation {
    background-color: $color-white;
    @media (max-width: 768.89px) {
      background-color: transparent;
      margin-top: 5.2rem;
    }
    .layout {
      padding: 1.2rem 0;
      color: $color-primary;
      @media (max-width: 768.89px) {
        padding: 1.2rem 0 0;
      }
    }
    .benefits {
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      @media (max-width: 768.89px) {
        display: block;
        box-sizing: border-box;
        width: 50%;
        margin: 0.5rem 0;
      }
      .money {
        margin-right: 0.8rem;
        height: 2rem;
        @media (max-width: 768.89px) {
          display: none;
        }
      }
    }
    .multi {
      display: flex;
    }
    .flex {
      flex: 1;
      text-align: center;
    }
    .value {
      line-height: 1.2;
      font-size: 1rem;
      font-weight: 500;
    }
    .unit {
      line-height: 1;
      font-size: 0.7rem;
      font-weight: 500;
      @media (max-width: 768.89px) {
        font-size: 0.65rem;
      }
    }
    .line {
      &::before {
        content: '';
        display: inline-block;
        margin: 0.05rem 0.5rem;
        width: 0.05rem;
        height: 1rem;
        background-color: rgba(#707070, 0.25);
      }
    }
    .text {
      line-height: 1.6;
      font-size: 0.7rem;
      text-align: center;
      @media (max-width: 768.89px) {
        margin-top: 0.1rem;
        font-size: 0.65rem;
      }
    }
    .invite-person {
      padding: 0 0.5rem;
      @media (max-width: 768.89px) {
        box-sizing: border-box;
        width: 50%;
        margin: 0.5rem 0;
      }
    }
    .invite-text {
      flex: 1;
      min-width: 12rem;
      max-width: 27rem;
      padding: 0 0.5rem;
      line-height: 1.6;
      font-size: 0.6rem;
      font-weight: 500;
      color: $color-secondary;
      text-align: left;
      @media (max-width: 768.89px) {
        order: 4;
        margin: 0.5rem 0.3rem;
      }
    }
    .btn-invite {
      @include btn-fill-pure();
      position: relative;
      margin: 0 1rem 0 0.5rem;
      box-sizing: border-box;
      width: 7rem;
      line-height: 2rem;
      border-radius: 2rem;
      @media (max-width: 768.89px) {
        margin: 0.5rem 0.8rem;
        width: 100%;
        border-radius: 2rem;
      }
      .icon {
        margin-left: 0.4rem;
        width: 0.7rem;
        vertical-align: -0.1rem;
      }
      &::after {
        content: '';
        position: absolute;
        top: -1rem;
        right: -1rem;
        display: block;
        width: 2.6rem;
        height: 2.4rem;
        background: url('~@/assets/page-minting/invitation-gift.png') 0 0 / contain no-repeat;
        @media (max-width: 768.89px) {
          right: 0;
        }
      }
    }
  }

  .mint {
    .mint-main {
      flex: 1;
    }
    .mint-content {
      padding: 0.1rem 0 2rem;
      background-color: $color-white;
      border-radius: 0.5rem;
      @media (max-width: 768.89px) {
        padding: 0.1rem 0 1rem;
        border-radius: 0;
      }
    }
    .layout {
      @media (max-width: 1200px) {
        display: block;
        padding: 0.8rem 0;
      }
    }
  }
  .overview {
    display: flex;
    line-height: 3em;
    padding: 0 3rem;
    @media (max-width: 768.89px) {
      flex-wrap: wrap;
      padding: 0.3rem 0.8rem;
      line-height: 2em;
    }
    .block {
      margin-right: 1rem;
      min-width: 6rem;
      text-align: left;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      @media (max-width: 768.89px) {
        margin: 0;
        width: 32%;
        min-width: auto;
        font-size: 0.8rem;
        &:not(:first-child) {
          margin-left: 2%;
        }
      }
      .icon {
        margin-right: 0.4rem;
        height: 1.1em;
        vertical-align: middle;
      }
      .text {
        vertical-align: middle;
      }
    }
    .notice {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 0.6rem;
      white-space: nowrap;
      overflow: hidden;
      @media (max-width: 768.89px) {
        width: 100%;
        flex: none;
      }
      .icon {
        margin-right: 0.4rem;
        height: 1.6em;
      }
      .message {
        flex: 1;
        width: 2rem;
        margin-left: 0.3rem;
        text-align: left;
        overflow: hidden;
      }
    }
  }
  .ham-wrap {
    display: flex;
  }
  .ham-left,
  .ham-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    @media (max-width: 1200px) {
      width: 0.8rem;
    }
    .btn-switch {
      cursor: pointer;
      @media (max-width: 1200px) {
        display: none;
      }
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
  .ham-main {
    flex: 1;
    width: 10rem;
    position: relative;
    display: flex;
    @media (max-width: 768.89px) {
      display: block;
    }
    .main-left {
      flex: 2.5;
      max-width: 32rem;
      padding: 0.1rem;
      background-image: linear-gradient(180deg, #03a9ff 0%, #df01ff 100%);
      border-radius: 0.5rem;
      @media (max-width: 768.89px) {
        max-width: none;
        height: 23rem;
        padding: 0;
      }
      .inner {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 1.2rem 1.5rem;
        height: 100%;
        font-size: 0.6rem;
        background-color: #f5f9ff;
        border-radius: 0.5rem;
        overflow: hidden;
        @media (max-width: 768.89px) {
          padding: 0.8rem;
        }
      }
      .nft-ham-center {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 15.3rem;
        height: 17rem;
        margin: -10rem 0 0 -7.6rem;
        background: url('~@/assets/minting/role-bg.png') center center no-repeat;
        background-size: 100%;
        text-align: center;
        .img {
          width: 15rem;
        }
      }
      .nft-ham-more {
        position: relative;
        z-index: 1;
        text-align: right;
        .btn-more {
          display: inline-block;
          cursor: pointer;
          &:nth-child(n + 2) {
            margin-left: 1rem;
          }
        }
        .img {
          margin-right: 0.3rem;
          width: 0.9rem;
          vertical-align: middle;
        }
        .text {
          color: #51525e;
          vertical-align: middle;
        }
      }
      .nft-ham-anubis {
        margin-top: -0.8rem;
        width: 9rem;
        text-align: left;
        font-size: 0.75rem;
        color: $color-secondary;
        @media (max-width: 768.89px) {
          font-size: 0.7rem;
        }
        .anubis-name {
          font-size: 2em;
          font-weight: 500;
          color: $color-primary;
        }
      }
      .nft-ham-bottom {
        display: flex;
        align-items: center;
        .exp {
          flex: 1;
          margin-top: -0.7rem;
          padding-right: 1.5rem;
          line-height: 0.8rem;
          text-align: left;
          font-size: 0.6rem;
          font-weight: 500;
          color: $color-secondary;
          @media (max-width: 768.89px) {
            padding-right: 0.7rem;
          }
        }
        .progress-wrap {
          display: flex;
          align-items: center;
          height: 1.4rem;
          border-radius: 1.4rem;
        }
        .progress {
          flex: 1;
          height: 0.9rem;
          background-color: rgba($color-blue, 0.05);
          border-radius: 1rem;
          overflow: hidden;
        }
        .progress-full {
          height: 100%;
          background: $color-blue;
        }
        .btn-feed {
          @include btn-fill-color();
          width: 27%;
          max-width: 7rem;
          line-height: 2rem;
          border-radius: 2rem;
          @media (max-width: 768.89px) {
            max-width: 3rem;
            border-radius: 2rem;
          }
        }
      }
      .empty-wrap {
        text-align: center;
      }
      .empty-img {
        margin: 1.5rem 0 0 0;
        height: 10rem;
      }
      .empty-text {
        margin: 2rem 0;
        font-size: 0.8rem;
        font-weight: 500;
        color: $color-secondary;
      }
      .empty-btn {
        @include btn-fill-color();
        width: 5.5rem;
        line-height: 2rem;
        border-radius: 2rem;
      }
    }
    .main-right {
      flex: 1;
      margin-left: 3%;
      padding: 0.1rem;
      background-image: linear-gradient(0, #03a9ff 0%, #df01ff 100%);
      border-radius: 0.5rem;
      @media (max-width: 768.89px) {
        margin: 0.8rem 0 0 0;
        padding: 0;
      }
      .inner {
        position: relative;
        box-sizing: border-box;
        padding: 0 2vw 2vw;
        min-height: 22.75rem;
        font-size: 0.8rem;
        background-color: #f5f9ff;
        border-radius: 0.5rem;
        @media (max-width: 768.89px) {
          padding: 0 0.8rem 0.2rem;
          min-height: 14.5rem;
        }
      }
      .btn-prize {
        position: absolute;
        top: 1rem;
        right: 0;
        padding: 0.6rem 0.4rem 0.6rem 2.2rem;
        width: 10em;
        line-height: 1.4;
        font-size: 0.7rem;
        background-image: linear-gradient(90deg, #0078ff, #ae00ff);
        border-radius: 0;
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
        @media (max-width: 768.89px) {
          top: 0.5rem;
          font-size: 0.65rem;
        }
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -0.2rem;
          display: inline-block;
          width: 2.6rem;
          height: 2.8rem;
          background: url(~@/assets/minting/prize-icon-color.png) 0 0 no-repeat;
          background-size: 100%;
        }
        &.disabled {
          background-image: none;
          background-color: #9898a0;
          cursor: pointer;
          &::before {
            background-image: url(~@/assets/minting/prize-icon-gray.png);
          }
        }
      }
      .level {
        padding: 0.5rem 0;
        line-height: 2.5;
        font-size: 1.2rem;
        text-align: left;
        border-bottom: 1px solid $color-border;
        @media (max-width: 768.89px) {
          padding: 0.4rem 0;
          font-size: 1rem;
        }
      }
      .attr-list {
        padding: 1.2rem 0;
        @media (max-width: 768.89px) {
          padding: 0.3rem 0 0.6rem;
          margin: 0.5rem -0.5rem;
          display: flex;
          flex-wrap: wrap;
        }
      }
      .attr-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        line-height: 1rem;
        font-size: 1rem;
        @media (max-width: 768.89px) {
          box-sizing: border-box;
          width: 50%;
          padding: 0.5rem;
          font-size: 0.8rem;
        }
      }
      .attr-icon {
        width: 1.1em;
        height: 1.1em;
      }
      .attr-name {
        display: block;
        margin: 0 0.3rem;
      }
      .attr-value {
        flex: 1;
        display: block;
        text-align: right;
      }
      .btn-stake,
      .btn-redeem {
        @include btn-fill-color();
        display: block;
        border-radius: 2rem;
      }
      .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .ham-list {
    display: flex;
    align-items: center;
    margin: 1.2rem 0 0;
    @media (max-width: 768.89px) {
      display: block;
      margin-top: 0.8rem;
    }
    .list {
      flex: 1;
      width: 0;
      margin-right: 0.8rem;
      padding: 0.9rem;
      background-color: #ecf0f6;
      border-radius: 0.5rem;
      text-align: left;
      overflow-x: auto;
      white-space: nowrap;
      @media (max-width: 768.89px) {
        width: auto;
        margin-right: 0;
        padding: 0.6rem 0.5rem;
      }
    }
    .item {
      vertical-align: middle;
      display: inline-flex;
      align-items: center;
      margin-right: 0.7rem;
      padding: 0.05rem 0.5rem 0.15rem 0.5rem;
      background-color: #e2e9f3;
      border: 0.05rem solid #e2e9f3;
      border-radius: 0.5rem;
      box-sizing: border-box;
      cursor: pointer;
      @media (max-width: 768.89px) {
        margin-right: 0.4rem;
        padding: 0.05rem 0.4rem 0.15rem 0.4rem;
      }
      &.active {
        border-color: $color-blue;
        background-color: darken(#e2e9f3, 3);
      }
      &.empty {
        width: 9.5rem;
        height: 5.3rem;
        justify-content: center;
        .img {
          width: 35%;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .cover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.4rem;
      height: 5rem;
      background: url('~@/assets/minting/list-bg.png') center center no-repeat;
      background-size: 100%;
      @media (max-width: 768.89px) {
        width: 4rem;
        height: 4.6rem;
      }
      .img {
        width: 3.7rem;
        height: 3.7rem;
        @media (max-width: 768.89px) {
          width: 3.3rem;
          height: 3.3rem;
        }
      }
    }
    .info {
      width: 4.15rem;
      line-height: 1.5;
      font-size: 0.8rem;
      @media (max-width: 768.89px) {
        width: 3.6rem;
        font-size: 0.75rem;
      }
      .id {
        font-size: 0.9em;
      }
      .time {
        margin-top: 0.2rem;
        font-size: 0.9em;
      }
    }
    .create {
      .btn-create {
        @include btn-fill-color();
        box-sizing: border-box;
        width: 11.4rem;
        padding: 1.5rem 1rem;
        line-height: 2rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        @media (max-width: 768.89px) {
          display: block;
          margin: 1rem 0.8rem 2rem;
          padding: 0 1rem;
          width: auto;
          line-height: 2.5rem;
        }
        .img {
          width: 2rem;
          margin-right: 0.8rem;
          vertical-align: middle;
          @media (max-width: 768.89px) {
            width: 1.2rem;
            margin-right: 0.4rem;
          }
        }
        .text {
          vertical-align: middle;
        }
      }
    }
  }

  .data-panel {
    margin-top: -12.9rem;
    @media (max-width: 1200px) {
      margin: 0.3rem 0 1rem;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      width: auto;
    }
    .btn-receive {
      @include btn-fill-pure();
      display: block;
      margin: 1.6rem 0 0.8rem;
      box-sizing: border-box;
      height: 2rem;
      line-height: 2rem;
      border-radius: 2rem;
      @media (max-width: 1200px) {
        margin: 0.4rem 0 0;
        width: 50%;
        max-width: 8.4rem;
        border-radius: 2rem;
      }
      .icon {
        margin-left: 0.4rem;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        vertical-align: -0.1rem;
        @media (max-width: 768.89px) {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>

