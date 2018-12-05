<template>
  <div>
    <Banner @scroll.passive.stop="stop_scroll"></Banner>
    <router-view class="index-view"></router-view>
  </div>
</template>

<script>
import Banner from './../views/Banner'

export default {
  name: 'Index',
  components: {
    Banner
  },
  methods: {
  }
}
</script>

<style scoped>
  .index-view {
    padding: 4rem 0 2rem 0;
  }
</style>

