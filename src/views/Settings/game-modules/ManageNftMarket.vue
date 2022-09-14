<template>
  <div class="settings-manage-nftmarket">
    <div class="settings-col" style="flex: 1.5">
      <FormItem label="Marketplace 项目图片">
        <div class="banner-update">
          <div class="cover">
            <div>
              File types supported: JPG, PNG, GIF<br />
              Max size: 2 MB<br />
              宽高比：5:1
            </div>
          </div>
        </div>
      </FormItem>
      <FormItem label="NFT合约"> </FormItem>
      <div class="settings-line"></div>
      <div class="settings-btns">
        <Button class="btn-save">Save</Button>
      </div>
    </div>
    <div class="settings-col"></div>
  </div>
</template>

<script>
import FormItem from '@/components/FormItem.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'ManageNftMarket',
  components: {
    FormItem,
    Button,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.settings-manage-nftmarket {
  display: flex;
  .banner-update {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    border: 0.1rem dashed $color-border;
    border-radius: 0.4rem;
    cursor: pointer;
    .cover {
      text-align: center;
      font-size: 0.7rem;
      color: #b4b9be;
      &::before {
        content: '';
        margin: 0 auto 1rem;
        display: block;
        width: 6rem;
        height: 4.5rem;
        background: url('~@/assets/page-settings/page-game/banner-update.png') center center /
          contain no-repeat;
      }
      .link {
        color: $color-blue;
      }
    }
    &:hover {
      .cover {
        &::before {
          background-image: url('~@/assets/page-settings/page-game/banner-update-a.png');
        }
      }
    }
  }
}
</style>

