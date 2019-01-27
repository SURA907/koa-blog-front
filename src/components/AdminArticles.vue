<template>
  <div>
    <span>文章管理</span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox} from 'element-ui'
  export default {
    name: "AdminArticles",
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['user_status'])
    },
    mounted() {
      if (this.user_status.sign_in_status !== 'sign_in') {
        MessageBox.alert('登陆后才可以管理文章', '警告', {
          type: 'warning',
          confirmButtonText: '确定',
          callback: () => {
            window.history.back()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>