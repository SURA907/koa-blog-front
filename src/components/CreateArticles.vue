<template>
  <div class="content">
    <div class="input">
      <input
        type="text"
        class="input-title input-item"
        placeholder="请输入标题"
        v-model="input_title">
      <hr>
      <input
        type="text"
        class="input-title input-item"
        placeholder="请输入描述"
        v-model="input_description">
      <hr>
      <textarea
        class="input-content input-item"
        placeholder="请输入文章主体(markdown)"
        v-model="input_content"></textarea>
    </div>
    <div class="show markdown-body" v-html="input_content_parse"></div>
    <div class="fixed-float"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import {mapState} from 'vuex'
  import {MessageBox} from 'element-ui'
  export default {
    name: "CreateArticles",
    data() {
      return {
        input_title: '',
        input_description: '',
        input_content: '',
      }
    },
    computed: {
      ...mapState(['user_status']),
      input_content_parse() {
        let content = this.input_content.trim()
        return marked(content)
      }
    },
    mounted() {
      if (this.user_status.sign_in_status !== 'sign_in') {
        MessageBox.alert('登录之后才可以创建文章', '警告', {
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

<style lang="less" scoped>
  .content {
    .fixed-float {
      clear: both;
    }
    .input {
      display: flex;
      flex-direction: column;
      margin: 0 0 0 1vw;
      width: 45%;
      float: left;
      background-color: #f4f4f4;
      padding: 1vw;
      border-radius: 8px;

      hr {
        margin: 1px 0 8px 0;
      }
      .input-item {
        padding: 2px 6px;
        outline: none;
        font-size: 16px;
        border: none;
        background-color: #f4f4f4;
      }
      .input-content {
        padding: 6px;
        height: 70vh;
        font-size: 18px;
        line-height: 1.4rem;
        background-color: #ffffff;
      }
    }
    .show {
      width: 42%;
      height: 72vh;
      float: right;
      overflow: auto;
      border-radius: 8px;
      margin: 0 1vw 0 0;
    }
  }
</style>