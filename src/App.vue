<template>
  <div>
    <div class="ie-content" v-if="isIE">
      <h1>检测到您当前使用的是ie浏览器</h1>
      <h2>为了保证您的浏览效果，请使用chrome、firefox、opera等现代浏览器</h2>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isIE: false
    }
  },
  mounted() {
    if ('ActiveXObject' in window) {
      this.isIE = true
    }
  }
}
</script>

<style>
  .ie-content {
    padding: 2rem;
  }
  .ie-content h1 {
    font-size: 2rem;
    font-weight: bolder;
  }
  .ie-content h2 {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: bold;
  }
</style>
