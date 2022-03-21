<template>
  <div class="comp-image-uploader">
    <div class="uploader-placeholder" v-if="!preview && !uploading && placeholder">
      {{ placeholder }}
    </div>
    <img class="uploader-image" v-if="preview" :src="preview" />
    <div class="uploader-progress" v-if="uploading && progress > 0">
      <div>{{ progress }}%</div>
    </div>
    <div class="uploader-cover" v-else></div>
    <input class="uploader-file" type="file" :disabled="uploading" @change="onChange" />
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    progress: Number,
    upload: Function,
    placeholder: String,
  },
  data() {
    return {
      preview: this.image || '',

      uploading: false,
    }
  },
  watch: {
    image(image) {
      this.preview = image
    },
  },
  methods: {
    async onChange(evt) {
      if (this.uploading) return

      const files = evt?.target?.files
      if (!files || !files.length) return

      const image = files[0]
      if (!image) return

      const blob = URL.createObjectURL(image)
      this.preview = blob

      let result = false
      this.uploading = true
      try {
        result = await this.upload(image)
      } catch (err) {
        console.warn(err)
      }
      this.uploading = false

      this.$emit('success', result)
    },
  },
}
