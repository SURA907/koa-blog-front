<template>
  <div v-if="isIE">
    <h1>检测到您使用了ie浏览器</h1>
    <h2>为保证浏览效果，请使用chrome、firefox、opera等现代浏览器</h2>
  </div>
  <div v-else>
    <h1>浏览器检测通过</h1>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      isIE: false
    }
  },
  mounted() {
    // 浏览器检测
    if ('ActiveXObject' in window) {
      this.isIE = true
    }
  }
}
</script>

<style scoped>

</style>
