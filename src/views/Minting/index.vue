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

