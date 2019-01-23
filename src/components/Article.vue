<template>
  <div>
    <div v-cloak class="content">
      <div v-if="this.articles.article_status === 'ready'">

        <h1 class="article-title">{{articles.article_data.title}}</h1>
        <div class="article-message">
          <span class="author el-icon-edit">{{articles.article_data.user}}</span>
          <span class="release-time el-icon-date">{{articles.article_data.create_at}}</span>
        </div>

        <div
          class="article-content markdown-body"
          v-html="this.articles.article_data.content">
        </div>

        <div class="comment-content">评论区-施工中</div>

      </div>
      <div class="error-message" v-else>{{articles.error_message}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "Article",
    computed: {
      ...mapState(['articles']),
      article_id() {
        return this.$route.params.article_id
      }
    },
    methods: {
      ...mapActions(['request_article']),
    },
    mounted() {
      this.request_article(this.article_id)
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
      margin: 1.2rem auto;
      text-align: center;
      font-size: 1.2rem;
    }
  }
</style>