<template>
  <div class="banner-content">
    <div class="top-content">

      <!-- 侧边导航栏按钮 -->
      <button class="btn-guide" @click="change_guide_status">
        <img class="guide-ico" src="./../assets/guide-ico.png">
      </button>

      <!-- 站点logo -->
      <router-link to="/home" class="btn-logo">
        <img src="./../assets/logo.png" class="logo" title="">
      </router-link>

      <!-- 搜索框 pc窗口-->
      <el-input
        class="search-input hidden-xs-only"
        size="small"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search_data"
        @keydown.enter.native="submit_search">
      </el-input>
      <!-- 搜索框 小屏设备 -->
      <div
        class="search-content-xs hidden-sm-and-up">
        <i
          @click="change_xs_search_status"
          class="el-icon-search">
        </i>

        <el-input
          class="search-input-xs"
          :class="{'search-input-xs-open': xs_search_input_show}"
          size="small"
          placeholder="搜索"
          v-model="search_data"
          @keydown.enter.native="submit_search_xs">
        </el-input>
      </div>

      <!-- 用户状态 -->
      <UserStatus class="user-status"/>

    </div>

    <!-- 侧边栏 -->
    <div class="side-content"
         @click="change_guide_status"
         :class="{'side-content-open': guide_is_show}">

      <div class="left-side-content">

        <div class="top-guide">
          <button class="btn-guide">
            <img class="guide-ico" src="./../assets/guide-ico.png">
          </button>

          <router-link to="/home" class="btn-logo">
            <img src="./../assets/logo.png" class="logo" title="">
          </router-link>
        </div>

        <router-link
          class="left-side-items"
          title="首页"
          to="/">
          <img src="./../assets/home-ico.png">
          <span>首页</span>
        </router-link>

        <router-link
          class="left-side-items"
          title="关于SURA"
          to="/">
          <img src="./../assets/about-sura-ico.png">
          <span>关于SURA</span>
        </router-link>

        <router-link
          class="left-side-items"
          title="关于站点"
          to="/">
          <img src="./../assets/about-site-ico.png">
          <span>关于站点</span>
        </router-link>

        <router-link
          class="left-side-items"
          title="GitHub"
          to="/">
          <img src="./../assets/github-ico.png">
          <span>GitHub</span>
        </router-link>

      </div>

    </div>
  </div>
</template>

<script>
  import {Notification} from 'element-ui'
  import UserStatus from './UserStatus'
  export default {
    name: "Banner",
    components: {
      UserStatus
    },
    data() {
      return {
        guide_is_show: false,
        xs_search_input_show: false,
        search_data: ''
      }
    },
    methods: {
      // 控制侧边栏开合
      change_guide_status() {
        this.guide_is_show = !this.guide_is_show
        if (this.guide_is_show === true) {
          document.getElementsByTagName('body')[0].className = 'hidden-scroll'
        } else {
          document.getElementsByTagName('body')[0].className = ''
        }
        return true
      },
      // 控制搜索框是否隐藏
      change_xs_search_status() {
        this.xs_search_input_show = !this.xs_search_input_show
      },
      // 提交搜索
      submit_search() {
        let search_data = this.search_data.trim()
        if (search_data === '') {
          // 输入为空
          Notification({
            title: '警告',
            message: '输入不能为空',
            type: 'warning',
            position: 'bottom-left'
          })
        } else {
          Notification({
            title: '成功',
            message: '搜索功能施工中',
            type: 'success',
            position: 'bottom-left'
          })
        }
      },
      // 提交搜索-小屏设备
      submit_search_xs() {
        alert('功能施工中')
      }
    }
  }
</script>

<style scoped>
  * {
    user-select: none;
  }
  .banner-content {
    width: 100%;
  }


  /* 顶部导航栏样式 */
  .top-content {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: #ffffff;
  }
  /* 统一设置button */
  .top-content button {
    padding: 0;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
  }
  /* 顶部按钮 */
  .top-content .btn-guide {
    margin-left: 2%;
  }
  .top-content .btn-guide .guide-ico {
    vertical-align: top;
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
  }
  /* 顶部logo */
  .top-content .btn-logo {
    margin-left: 2%;
  }
  .top-content .btn-logo .logo {
    vertical-align: top;
    display: inline-block;
    height: 1.2rem;
  }
  /* 搜索栏 pc正常窗口 */
  .top-content .search-input {
    flex-grow: 1;
    width: 30%;
    margin-left: 10%;
    margin-right: 20%;
    user-select: text;
  }
  /* 搜索栏 手机端窗口 */
  .top-content .search-content-xs {
    cursor: pointer;
    position: relative;
  }
  .top-content .search-input-xs {
    position: absolute;
    width: 90vw;
    height: 0;
    overflow: hidden;
    top: 2rem;
    left: -59vw;
    transition: height 0.3s;
    user-select: text;
  }
  .top-content .search-input-xs-open {
    height: 32px;
  }
  .top-content .user-status {
    height: 1.4rem;
    line-height: 1.4rem;
  }

  /*侧边栏样式*/
  .banner-content .side-content {
    /*display: flex;*/
    position: fixed;
    overflow: hidden;
    width: 0;
    height: 100vh;
    transition: width 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .banner-content .side-content-open {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .banner-content .side-content .left-side-content {
    overflow: auto;
    /*display: flex;*/
    /*flex-direction: column;*/
    width: 15rem;
    height: 100vh;
    background-color: #f4f4f4;
    border-right: 1px inset #bbffaa;
  }
  .banner-content .side-content .right-side-content {
    flex-grow: 1;
    height: 100vh;

  }
  .banner-content .side-content .left-side-content .top-guide {
    display: flex;
    align-items: center;
    height: 3rem;
  }
  .banner-content .side-content .left-side-content .top-guide .guide-ico {
    vertical-align: top;
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
  }
  .banner-content .side-content .left-side-content .top-guide .logo {
    vertical-align: top;
    display: inline-block;
    height: 1.2rem;
  }
  .banner-content .side-content .left-side-content .top-guide button {
    padding: 0;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
  }
  .banner-content .side-content .left-side-content .top-guide .btn-guide {
    margin-left: 2vw;
  }
  .banner-content .side-content .left-side-content .top-guide .btn-logo {
    margin-left: 2vw;
  }
  .banner-content .side-content .left-side-content a {
    text-decoration: none;
    transition: background-color 0.3s;
    width: 100%;
  }
  .banner-content .side-content .left-side-content a:hover {
    background-color: #eaeaea;
  }
  .banner-content .side-content .left-side-content .left-side-items {
    display: flex;
    height: 2.4rem;
    align-items: center;
  }
  .banner-content .side-content .left-side-content .left-side-items img {
    width: 1.2rem;
    margin: 0 2.2vw;
  }
</style>

