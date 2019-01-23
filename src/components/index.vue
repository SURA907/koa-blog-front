<template>
  <div>
    <Banner></Banner>
    <keep-alive include="Home">
      <router-view class="index-view"></router-view>
    </keep-alive>
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
    padding: 4rem 0 2rem 0;
  }
</style>
