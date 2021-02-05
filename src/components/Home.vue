<template>
  <div class="home-content">
    <div class="top-content">
      <div class="logo-content">
        <img src="./../assets/carousel-item2.jpg" alt="">
      </div>

      <div class="logo-side-content">
        <div class="side-items">聊天室</div>
        <div class="side-items">建站日志</div>
        <div class="side-items">联系SURA</div>
      </div>
    </div>

    <!-- 文章展示-pc端 -->
    <div class="article-list-content" v-for="(item, index) in index_data" :key="index">
      <img class="img-content" src="https://api.ixiaowai.cn/mcapi/mcapi.php" alt="random image">
      <div class="article-list-items">
        <router-link
          class="article-title"
          :to="item.article_address">
          {{item.title}}
        </router-link>
        <div class="article-description">{{item.description}}</div>
        <div class="article-information-content article-text">
          <span class="author el-icon-edit">{{item.user}}</span>
          <span class="release-time el-icon-date"> 张贴于{{item.create_at}}</span>
        </div>
      </div>
    </div>
    <div class="request-status">
      <!-- 数据请求中 -->
      <div v-if="this.loading === true">LOADING...</div>
      <!-- 数据请求完成，无错误 -->
      <div v-if="this.loading === false && this.err_message === null" class="bottom-btn-content">
      <span v-if="full_load">没有更多了(T_T)</span>
      <el-button @click="load_article" v-else>点击加载更多</el-button>
      </div>
      <!-- 数据请求完成，有错误 -->
      <div v-if="this.loading === false && this.err_message !== null">{{err_message}}，请稍后再试</div>
    </div>
  </div>
</template>

<script>
  import API from '../../api'
  import axios from '../http'
  import moment from 'moment'
  export default {
    name: "Home",
    data() {
      return {
        time: null,
        page: 0,
        index_data: [],
        loading: false,
        err_message: null,
        full_load: false
      }
    },
    computed: {},
    methods: {
      load_article() {
        let url = `${API.INDEX}?time=${this.time}&page=${this.page}`
        // 加载中
        this.loading = true
        axios.get(url).then(res => {
          let result = res.data
          if (result.code === 0) {
            // 请求成功
            // 没有新的文章
            if (result.data.length === 0) {
              this.full_load = true
            }
            let data = result.data.map(item => ({
              article_address: '/articles/'+item._id,
              _id: item._id,
              title: item.title,
              description: item.description,
              img: item.img,
              create_at: moment(item.create_at).format('YYYY-MM-DD HH:mm:ss'),
              update_at: moment(item.update_at).format('YYYY-MM-DD HH:mm:ss'),
              user: item.user,
              user_id: item.user_id
            }))
            this.loading = false
            for (let item of data) {
              this.index_data.push(item)
            }
            this.page++
          } else {
            // 请求失败
            this.loading = false
            this.err_message = result.message
          }
        })
      },

    },
    mounted() {
      // 初始化时间戳
      this.time = new Date().getTime()
      this.page = 0
      this.load_article()
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
    text-decoration: none;
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
  .home-content .request-status {
    width: 100%;
    text-align: center;
    margin: 1rem 0;
  }
  .home-content .request-status button {
    background-color: #D763AF;
    color: #F4F4F4;
    border-radius: 12px;
  }
</style>
