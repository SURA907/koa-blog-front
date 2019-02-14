<template>
  <div class="user-status">
    <span class="btn-home" v-if="user_status.sign_in_status === 'sign_out'">
      <router-link to="/signin">
        <span>登录</span>
      </router-link>
      <span>&nbsp;|&nbsp;</span>
      <router-link to="/signup">
        <span>注册</span>
      </router-link>
    </span>
    <span
      @click="user_status_over"
      class="user-message" v-else>
      <span class="username">hi,&nbsp;{{user_status.username}}</span>
      <i class="el-icon-caret-bottom"></i>
    </span>
    <span
      class="user-setting-content-default"
      :class="{'user-setting-content-show': user_status_hover}"
      @mouseover="user_status_over"
      @mouseleave="user_status_leave">
      <span class="user-type">用户类型：{{user_status.type}}</span>

      <el-button
        class="user-setting-btn"
        @click="to_create_article">文章</el-button>
      <el-button
        class="btn-sign-out user-setting-btn"
        @click="sign_out">登出</el-button>
    </span>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "UserStatus",
    data() {
      return {
        user_status_hover: false
      }
    },
    computed: {
      ...mapState(['user_status'])
    },
    methods: {
      ...mapActions(['get_user_public', 'user_sign_out', 'initialization_user_statue']),
      user_status_over() {
        this.user_status_hover = true
      },
      user_status_leave() {
        this.user_status_hover = false
      },
      sign_out() {
        this.user_status_hover = false
        this.user_sign_out()
        let route = this.$route.path
        let route_reg = /(^\/chatroom$|^\/home$|^\/articles\/[^/]{24}$)/
        if (route_reg.test(route) !== true) {
          this.$router.push({
            path: '/home'
          })
        }
      },
      to_create_article() {
        this.user_status_hover = false
        this.$router.push({
          path: '/articles/users/admin'
        })
      }
    },
    mounted() {
      this.initialization_user_statue()
      this.get_user_public()
    }
  }
</script>

<style lang="less" scoped>
  // 用户状态
  .user-status {
    margin: 0 2rem 0 0;
    position: relative;

    a {
      text-decoration: none;
    }

    .user-message {
      color: #777777;
      font-size: 1rem;
      cursor: pointer;

      span {
        height: 1.4rem;
        line-height: 1.4rem;
      }
    }

    .user-setting-content-default {
      position: absolute;
      overflow: hidden;
      top: 22px;
      left: -65px;
      width: 0;
      height: 0;
      text-align: center;
      background-color: #f6f6f6;
      padding: 12px 0;
      transition: width,height 0.5s;

      .user-setting-btn {
        margin-top: 12px;
        padding: 4px 12px;
        background-color: rgba(0, 0, 0, 0.06);
      }
    }
    .user-setting-content-show {
      height: 55px;
      width: 164px;
    }
  }
</style>