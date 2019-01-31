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
      <div class="operating-article">
        <el-tooltip effect="dark" content="返回" placement="top">
          <span
            class="operating-btn el-icon-back"
            @click="back"></span>
        </el-tooltip>
        <el-tooltip effect="dark" content="保存" placement="top">
          <span
            class="operating-btn el-icon-upload"
            @click="submit"></span>
        </el-tooltip>
      </div>
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
  import {MessageBox, Notification} from 'element-ui'
  import API from '../api'
  import axios from '../http'
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
    },
    methods: {
      back() {
        window.history.back()
      },
      submit() {
        let title = this.input_title.trim()
        let description = this.input_description.trim()
        let content = encodeURIComponent(this.input_content.trim())
        let theme = '无主题'
        let img = 'null'
        let type = 'markdown'
        if (title.length === 0 || description.length === 0 || content.length === 0) {
          // 参数不完整
          MessageBox.alert('标题、文章描述、文章主体均不能为空', '警告', {
            type: 'warning',
            confirmButtonText: '确定'
          })
        } else {
          // 发起请求
          let url = API.INDEX
          axios.post(url, {
            title,
            description,
            content,
            theme,
            img,
            type
          }).then(res => {
            let result = res.data
            if (result.code === 0) {
              Notification({
                title: '成功',
                message: '文章编辑成功',
                type: 'success',
                position: 'bottom-left'
              })
              this.$router.push(`/articles/${result.data._id}`)
            } else {
              MessageBox.alert(result.message, '错误', {
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          })
        }
      }
    },
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
        height: 65vh;
        font-size: 18px;
        line-height: 1.4rem;
        background-color: #ffffff;
        resize: none;
      }
      .operating-article {
        height: 2rem;
        background-color: #D9D9D9;

        .operating-btn {
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          /*margin-right: 1rem;*/
          text-align: center;
          cursor: pointer;
        }
        .operating-btn:hover {
          background-color: #595959;
          color: #D9D9D9;
        }
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