<template>
  <section class="home-banners">
    <div class="btns-top">
      <Button class="btn-add" @click="onAdd">Add</Button>
    </div>
    <draggable class="list" :list="list" item-key="id" handle=".move">
      <template #item="{ element, index }">
        <div class="item">
          <div class="form">
            <FormItem label="Image">
              <ImageUploader
                class="uploader-image"
                placeholder="Use in PC"
                :image="element.PcImageUrl"
                :progress="element.pcProgress"
                :upload="onUploadProgressFactory(element, 'PcImageUrl', 'pcProgress')"
              ></ImageUploader>
              <ImageUploader
                class="uploader-image mobile"
                placeholder="Use in Mobile"
                :image="element.MobileImageUrl"
                :progress="element.mobileProgress"
                :upload="onUploadProgressFactory(element, 'MobileImageUrl', 'mobileProgress')"
              ></ImageUploader>
            </FormItem>
            <FormItem label="Link">
              <Input v-model="element.Link"></Input>
            </FormItem>
          </div>
          <div class="operate">
            <a class="btn-o del" @click="onDelete(index)">Delete</a>
            <a class="btn-o move">Move</a>
          </div>
        </div>
      </template>
    </draggable>
    <div class="btns-bottom">
      <Button class="btn-save" loader :handler="onSave">Save</Button>
    </div>
  </section>
</template>

<script>
import FormItem from '@/components/FormItem.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import draggable from 'vuedraggable'
import { uploadImage, getBanners, updateBanners } from '@/models/admin.model'

const MAX = 6

export default {
  name: 'Banners',
  components: {
    FormItem,
    Input,
    Button,
    ImageUploader,
    draggable,
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    onUploadProgressFactory(item, propImageName, propProgressName) {
      return async (image) => {
        const imageUrl = await uploadImage(image, 'banner', (evt) => {
          const progress = (evt.loaded || 0) / evt.total
          item[propProgressName] = parseInt(progress * 100)
        })
        item[propImageName] = imageUrl || ''
        return imageUrl
      }
    },

    onAdd() {
      if (this.list.length >= MAX) {
        this.$modal.toast(`No more than ${MAX} allowed`)
        return
      }

      this.list.push({
        PcImageUrl: '',
        MobileImageUrl: '',
        Link: '',
        pcProgress: 0,
        mobileProgress: 0,
      })
    },
    onDelete(index) {
      this.$modal.confirm({
        content: 'Are you sure you want to delete?',
        confirmCallback: () => {
          this.list.splice(index, 1)
        },
      })
    },
    async onSave() {
      const data = (this.list || []).map((item) => ({
        PcImageUrl: item.PcImageUrl || '',
        MobileImageUrl: item.MobileImageUrl || '',
        Link: item.Link || '',
      }))

      const result = await updateBanners(data)
      if (result) {
        this.$modal.toast('success')
      }
    },

    async init() {
      const list = await getBanners()
      this.list = (list || []).map((item) => ({
        ...item,
        pcProgress: 0,
        mobileProgress: 0,
      }))
    },
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/variable.scss';

.home-banners {
  .btns-top {
    margin-bottom: 2%;
    .btn-add {
      @include btn-fill-pure($color-blue);
      width: 4rem;
      border-radius: 0.3rem;
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.8% 2.4%;
    background-color: rgba($color-blue, 0.02);
    &:nth-child(2n) {
      background-color: rgba($color-black, 0.02);
    }
    .form {
      max-width: 42rem;
      width: 80%;
    }
    .uploader-image {
      width: 19.2rem;
      height: 8rem;
      line-height: 8rem;
      background-color: #f7fafd;
      border-radius: 0.5rem;
      &.mobile {
        margin-left: 1rem;
        width: 12.5rem;
      }
    }
    .operate {
      flex: 1;
      text-align: right;
      .btn-o {
        margin-left: 1.2em;
        font-size: 0.7rem;
        -webkit-user-select: none;
      }
      .del {
        color: $color-red;
        cursor: pointer;
      }
      .move {
        color: $color-gray;
        cursor: move;
      }
    }
  }

  .btns-bottom {
    margin-top: 3%;
    .btn-save {
      @include btn-fill-pure($color-blue);
      width: 4rem;
      border-radius: 0.3rem;
    }
  }
}
</style>
<style lang="scss">
.home-banners {
  .fbx-form-item {
    margin: 0.8rem 0;
    display: flex;
    .label {
      width: 6rem;
    }
    .fbx-input {
      flex: 1;
    }
  }
}
</style>

