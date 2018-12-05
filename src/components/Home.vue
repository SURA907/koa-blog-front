<template>
  <div class="home-content">
    <div class="top-content">
      <div class="logo-content">
        <img src="./../assets/carousel-item2.png" alt="">
      </div>

      <div class="logo-side-content">
        <div class="side-items">7日热门</div>
        <div class="side-items">建站日志</div>
        <div class="side-items">联系SURA</div>
      </div>
    </div>

    <!-- 文章展示-pc端 -->
    <div class="article-list-content" v-for="(item, index) in index_data" :key="index">
      <img class="img-content" src="./../assets/article-img.jpg" alt="">
      <div class="article-list-items">
        <router-link
          class="article-title"
          :to="item.article_address">
          {{item.article_title}}
        </router-link>
        <div class="article-description">{{item.article_description}}</div>
        <div class="article-information-content article-text">
          <span class="author el-icon-edit">{{item.article_author}}</span>
          <span class="release-time el-icon-date"> 张贴于{{item.article_release_time}}</span>
        </div>
      </div>
    </div>
    <div class="bottom-btn-content">
      <span v-if="full_load">没有更多了(T_T)</span>
      <el-button @click="load_article" v-else>点击加载更多</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "Home",
    computed: {
      ...mapState(['index_data', 'full_load'])
    },
    methods: {
      ...mapActions(['request_index', 'initialization_time']),
      load_article() {
        this.request_index()
      }
    },
    mounted() {
      // 初始化时间戳
      this.initialization_time()
      this.request_index()
    }
  }
</script>

<style scoped>
  .home-content {
    width: 70vw;
    font-size: 1.8vw;
    margin: 0 auto;
    user-select: none;
  }
  .home-content .top-content {
    display: flex;
    align-items: center;
  }
  .home-content .top-content .logo-content {
    height: 27vw;
    width: 48vw;
    overflow: hidden;
    border-radius: 12px 12px 12px 12px;
  }
  .home-content .top-content .logo-content img {
    width: 100%;
    height: 100%;
    user-select: none;
  }
  .home-content .top-content .logo-side-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 27vw;
  }
  .home-content .top-content .side-items {
    width: 14vw;
    padding: 2vw 0;
    color: #f4f4f4;
    text-align: center;
    border-radius: 0 8px 8px 0;
    background-color: #D7A36F;
    cursor: pointer;
  }
  .home-content .article-list-content {
    display: flex;
    align-items: center;
    width: 100%;
    /*min-height: 200vh;*/
    padding: 2rem 0 0 0;
    user-select: text;
  }
  .home-content .article-list-content .article-list-items {
    display: flex;
    align-items: self-start;
    flex-direction: column;
    flex-grow: 1;
    margin: 0 0 1.4rem 0.4rem;
  }
  .home-content .article-list-content .article-list-items a {
    text-decoration: none;

  }
  .home-content .article-list-content .article-list-items .article-title {
    font-size: 18px;
    line-height: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
  }
  .home-content .article-list-content .article-list-items .article-description {
    padding: 0.3rem 0.2rem;
    line-height: 1.2rem;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
  }
  .home-content .article-list-content .article-list-items .article-information-content {
    font-size: 14px;
    color: #787878;
  }
  .home-content .article-list-content .article-list-items .article-information-content .release-time {
    margin-left: 1rem;
  }
  .home-content .article-list-content .img-content{
    width: 150px;
    height: 100px;
    margin: 0 0 1.4rem 0;
  }
  .home-content .bottom-btn-content {
    width: 100%;
    text-align: center;
  }
  .home-content .bottom-btn-content button {
    background-color: #D763AF;
    color: #F4F4F4;
    border-radius: 12px;
  }
</style>