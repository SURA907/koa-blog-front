<template>
  <div>
    <Banner></Banner>
    <router-view class="index-view"></router-view>
  </div>
</template>

<script>
  import Banner from './../views/Banner'
  export default {
    name: 'Index',
    components: {
      Banner
    }
  }
</script>

<style scoped>
  .index-view {
    padding: 3rem 0 1rem 0;
  }
</style>
