<template>
  <q-page class="Portfolio">
    <div v-if="!!error" class="text-center">
      <h2 class="Portfolio__error">{{ error }}</h2>
    </div>
    <div v-else-if="!!loading && images.length <= 0" class="text-center">
      <q-circular-progress indeterminate size="40px" color="primary" />
    </div>
    <masonry v-else :cols="{ default: 3, 700: 2 }" :gutter="6">
      <div
        class="Portfolio__imageWrapper"
        v-for="image in images"
        :key="image._id"
      >
        <q-img
          class="Portfolio__image"
          :src="image.img"
          @click="openFullscreen(image)"
          :alt="image.nameImage"
        />
        <q-btn
          class="Portfolio__link"
          :href="image.link"
          type="a"
          target="_blank"
          icon="open_in_new"
          color="white"
          text-color="dark"
          unelevated
          round
          dense
        />
      </div>
    </masonry>

    <q-dialog v-model="fullscreen">
      <q-img :src="fullscreen_image" />
    </q-dialog>
  </q-page>
</template>



<script>
export default {
  name: "Portfolio",
  mounted() {
    this.$store.dispatch('portfolio/loadPortfolio')
  },
  data: () => ({
    fullscreen: false,
    fullscreen_image: null
  }),
  methods: {
    openFullscreen(image) {
      this.fullscreen_image = image.img;
      this.fullscreen = true;
    },
  },
  computed: {
    loading () {
      return this.$store.state.portfolio.loading 
    },
    error () {
      return this.$store.state.portfolio.error
    },
    images () {
      return this.$store.state.portfolio.images
    }
  }
};
</script>

<style lang="scss">
// $
.Portfolio {
  @include content-width;
  padding: 40px 0;
}

.Portfolio__imageWrapper {
  margin-bottom: 6px;
  position: relative;
}

.Portfolio__image {
  cursor: zoom-in;
  background-color: $light-gray;
  min-height: 100px;
}

.Portfolio__link {
  position: absolute;
  font-size: 10px;
  bottom: 8px;
  right: 8px;
}

.Portfolio__error {
  @include font(24px, bold, $red-lips);
  margin: 0;
}
</style>
