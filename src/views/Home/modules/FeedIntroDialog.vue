<template>
  <Dialog class="dialog-home dialog-feed-explain" :visible="visible" @hide="onHide">
    <main class="main">
      <header class="header">
        <h1 class="title">{{ $t('Home.FeedInstructions.FeedingInstructions') }}</h1>
        <div class="close-wrap">
          <a class="close" @click="onHide"></a>
        </div>
      </header>
      <ul class="list">
        <li class="item">
          <i class="order">1</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.MinedForFree') }}
          </p>
        </li>
        <li class="item">
          <i class="order">2</i>
          <p class="text one-line">{{ $t('Home.FeedInstructions.MultipleAttributes') }}</p>
        </li>
        <li class="item">
          <i class="order">3</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.UpgradeHam') }}
          </p>
        </li>
        <li class="item">
          <i class="order">4</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.StakeHam') }}
          </p>
        </li>
        <li class="item">
          <i class="order">5</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.HamCanBeFed') }}
          </p>
        </li>
        <li class="item">
          <i class="order">6</i>
          <div class="text">
            <p>
              {{ $t('Home.FeedInstructions.HamCorresponds') }}
            </p>
            <div class="m-v-hide" style="margin: 1rem auto 0">
              <img style="width: 96%" src="@/assets/home/dialog-feed-table.png" />
            </div>
            <div class="pc-v-hide" style="margin: 1rem auto 0">
              <div class="table-tips">
                <div>
                  <img style="width: 0.675rem" src="@/assets/home/dialog-feed-level.png" />
                  <span> = LEVEL</span>
                </div>
                <div>
                  <img style="width: 0.725rem" src="@/assets/home/dialog-feed-power.png" />
                  <span> = HASHRATE</span>
                </div>
              </div>
              <img
                class="pc-v-hide"
                style="width: 104%; margin-left: -1rem"
                src="@/assets/home/dialog-feed-table-m.png"
              />
            </div>
          </div>
        </li>
        <li class="item">
          <i class="order">7</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.ProportionOfFeeding') }}
          </p>
        </li>
        <li class="item">
          <i class="order">8</i>
          <div class="text one-line">
            <p>{{ $t('Home.FeedInstructions.MiningModelFormula') }}</p>
            <ul class="sub-list">
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula1') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula2') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula3') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula4') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula5') }}</li>
              <li class="sub-item">{{ $t('Home.FeedInstructions.MiningModelFormula6') }}</li>
            </ul>
          </div>
        </li>
        <!-- <li class="item">
          <i class="order">9</i>
          <p class="text">
            {{ $t('Home.FeedInstructions.FirstToReach') }}
          </p>
        </li> -->
      </ul>
    </main>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'FeedIntroDialog',
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
