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

