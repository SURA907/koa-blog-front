<template>
  <div>
    <div v-cloak class="content" v-if="this.article.status === 'ready'">
      <h1 class="article-title">{{article.data.title}}</h1>
      <div class="article-message">
        <span class="author el-icon-edit">&nbsp;{{article.data.user}}</span>
        <span class="release-time el-icon-date">&nbsp;{{article.data.create_at}}</span>
      </div>
      <div
        class="article-content markdown-body"
        v-html="this.article.data.content">
      </div>
      <Comment class="comment-content"></Comment>
    </div>
  </div>
</template>

<script>
  import API from '../api'
  import axios from '../http'
  import moment from 'moment'
  import marked from 'marked'
  import {MessageBox} from 'element-ui'
  import Comment from '../views/Comment'
  export default {
    name: "Article",
    data() {
      return {
        article: {
          status: null,
          data: null
        }
      }
    },
    components : {
      Comment
    },
    computed: {},
    methods: {
      load_article() {
        let id = this.$route.params['id']
        let url = API.ARTICLE+id
        this.article.status = 'loading'
        axios.get(url).then(res => {
          let result = res.data
          if (result.code === 0) {
            // 请求成功
            // 格式化参数
            let data = result.data
            data.create_at = moment(data.create_at).format('YYYY-MM-DD HH:mm:ss')
            data.update_at = moment(data.update_at).format('YYYY-MM-DD HH:mm:ss')
            data.content = decodeURIComponent(data.content)
            if (data.type === 'markdown') {
              data.content = marked(data.content)
            }
            this.article.status = 'ready'
            this.article.data = data
          } else {
            this.article.status = 'error'
            // 请求失败
            MessageBox.alert('文章不存在或已删除', '警告', {
              type: 'warning',
              confirmButtonText: '确定'
            }).then(() => {
              window.history.back()
            })
          }
        })
      }
    },
    mounted() {
      this.load_article()
    }
  }
</script>

<style lang="less" scoped>
  [v-cloak] {
    display: none;
  }
  .content {
    width: 100%;

    .article-title {
      width: 80%;
      font-size: 2.25em;
      font-weight: bolder;
      line-height: 1.2;
      margin: 0.67em auto 0;
      padding-bottom: 0.3em;
      text-align: center;
    }

    .article-message {
      width: 80%;
      margin: 0.25em auto;
      text-align: center;
      font-size: 1rem;

      .release-time {
        margin-left: 2em;
      }
    }

    .article-content {
      width: 80%;
      margin: 0 auto;
    }

    .error-message {
      font-size: 1.3rem;
      font-weight: 500;
      text-align: center;
    }

    .comment-content {
      width: 80%;
      margin: 1.3rem auto;
      padding: 2rem 3rem;
    }
  }
</style>