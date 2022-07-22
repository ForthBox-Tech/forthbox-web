<template>
  <div class="market-carnivals-detail page-wrap2">
    <section class="main main-wrap2">
      <DetailImage class="cover" :image="activity.image"></DetailImage>
      <DetailBoard class="info" :name="activity.name" :tags="tags">
        <div class="box">
          <div class="price">
            <div class="label">{{ $t('CompFilter.Price') }}</div>
            <div class="value">
              <img class="icon" :src="activity.tokenLogo" />
              <span class="text">{{ activity.price }}</span>
              <span class="unit">{{ activity.token }}</span>
            </div>
          </div>
          <div class="btns-wrap">
            <Button
              class="btn-color btn-buy"
              :disabled="!activity.isPurchasable"
              loader
              :handler="onBuy"
            >
              <img class="icon" src="@/assets/page-market2/comp-detail/btn-buy.png" />
              <span>{{ $t('Carnival2.Buy') }}</span>
            </Button>
            <Button
              class="btn-stroke btn-open"
              :disabled="activity.ownCount <= 0"
              loader
              :handler="onOpen"
            >
              <img
                class="icon"
                :src="
                  activity.ownCount <= 0
                    ? require('@/assets/page-market2/comp-detail/btn-open-0.png')
                    : require('@/assets/page-market2/comp-detail/btn-open.png')
                "
              />
              <span>{{ $t('Carnival2.OpenBox') }}</span>
            </Button>
            <Button class="btn-stroke btn-market" :handler="onMarket">
              <span>{{ $t('Carnival2.GoToMarketplace') }}</span>
              <img class="icon" src="@/assets/page-market2/comp-detail/btn-more.png" />
            </Button>
          </div>
        </div>
      </DetailBoard>
    </section>
    <section class="prizes main-wrap2">
      <h1 class="wrap-title">Prizes</h1>
      <ul class="list">
        <li class="item" v-for="item in activity.prizes" :key="item">
          <div
            class="image"
            :style="{
              backgroundImage: `url(${item.image})`,
            }"
          ></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <ul class="tags">
              <Tag class="tag" :label="$t('Carnival2.Rarity')" :value="item.epic"></Tag>
              <Tag class="tag" :label="$t('Carnival2.Probability')" :value="item.rate"></Tag>
            </ul>
          </div>
        </li>
      </ul>
    </section>
    <section class="description main-wrap2">
      <h1 class="wrap-title">Description</h1>
      <div class="content">
        <section class="section" v-for="item in activity.description" :key="item">
          <h2 class="title">{{ item.title }}</h2>
          <template v-if="typeof item.text === 'string'">
            <p class="text">{{ item.text }}</p>
          </template>
          <template v-else>
            <ul class="text">
              <li v-for="text in item.text" :key="text">{{ text }}</li>
            </ul>
          </template>
        </section>
      </div>
    </section>
  </div>

  <PrizeDialog ref="prizeDialog"></PrizeDialog>
</template>

<script>
import Button from '@/components/Button.vue'
import DetailImage from './components/DetailImage.vue'
import DetailBoard from './components/DetailBoard.vue'
import Tag from './components/Tag.vue'
import PrizeDialog from './components/PrizeDialog.vue'
import initTriggerMixin from '@/mixins/init-trigger'
import { activities } from '@/models/market2.carnivals.model'

export default {
  name: 'CarnivalsDetail',
  components: {
    Button,
    DetailImage,
    DetailBoard,
    Tag,
    PrizeDialog,
  },
  data() {
    return {
      activity: {},

      prize: {},
    }
  },
  computed: {
    tags() {
      let tags = []

      const activity = this.activity || {}
      if (activity.name) {
        tags = [
          { label: this.$t('Carnival2.Quantity'), value: activity.count },
          { label: this.$t('Carnival2.Sold'), value: activity.soldCount },
          { label: this.$t('Carnival2.Limited'), value: activity.limit },
          { label: this.$t('Carnival2.YouOwn'), value: activity.ownCount },
        ]
      }

      return tags
    },
  },
  mixins: [initTriggerMixin({ isConnectWallet: true })],
  methods: {
    async onBuy() {
      const activity = this.activity || {}
      if (!activity || !activity.buy) return

      const result = await activity.buy()
      if (result && result.status === 'success') {
        this.$refs.prizeDialog.show(result)
        await activity.init()
      }
    },
    async onOpen() {
      const activity = this.activity || {}
      if (!activity || !activity.open) return

      const result = await activity.open()
      if (result && result.status === 'success') {
        this.$refs.prizeDialog.show(result)
        await activity.init()
      }
    },
    onMarket() {
      this.$router.push('/market2/marketplace')
    },

    async _getDetail() {
      const id = this.$route.query.id
      const activity = activities.find((item) => item.id == id)
      if (!activity) {
        this.activity = {}
        return
      }

      this.activity = activity

      try {
        await this.activity.init()
      } catch (err) {
        console.warn(err)
      }
    },
    async init() {
      await this._getDetail()
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

