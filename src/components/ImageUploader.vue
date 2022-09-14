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
</script>

<style lang="scss">
@import '@/common/css/variable.scss';

.comp-image-uploader {
  position: relative;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  .uploader-image {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .uploader-progress,
  .uploader-cover,
  .uploader-file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .uploader-progress {
    z-index: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: $color-white;
    background-color: rgba($color-black, 0.2);
  }
  .uploader-cover {
    display: none;
    z-index: 9;
    background: rgba($color-black, 0.2) url('~@/assets/page-settings/page-account/user-update.png')
      center center / 1.5rem no-repeat;
  }
  .uploader-file {
    z-index: 10;
    opacity: 0;
    cursor: pointer;
  }
  &:hover {
    .uploader-placeholder {
      display: none;
    }
    .uploader-cover {
      display: block;
    }
  }
}
</style>
