<template>
  <section class="home-news">
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
                :image="element.ImageUrl"
                :progress="element.progress"
                :upload="onUploadProgressFactory(element, 'ImageUrl', 'progress')"
              ></ImageUploader>
            </FormItem>
            <FormItem label="Title">
              <Input v-model="element.Title"></Input>
            </FormItem>
            <FormItem label="Description">
              <Textarea v-model="element.Description" :rows="4"></Textarea>
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
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import draggable from 'vuedraggable'
import { uploadImage, getNews, updateNews } from '@/models/admin.model'

const MAX = 6

export default {
  name: 'CryptoNews',
  components: {
    FormItem,
    Input,
    Textarea,
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
        const imageUrl = await uploadImage(image, 'news', (evt) => {
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

      this.list.push({ ImageUrl: '', progress: 0, Title: '', Description: '', Link: '' })
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
        ImageUrl: item.ImageUrl || '',
        Title: item.Title || '',
        Description: item.Description || '',
        Link: item.Link || '',
      }))
      console.log('------', data)
      const result = await updateNews(data)
      if (result) {
        this.$modal.toast('success')
      }
    },

