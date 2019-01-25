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
    <span class="user-message" v-else>
      <span>hi,&nbsp;</span>
      <span class="username">{{user_status.username}}</span>
    </span>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "UserStatus",
    computed: {
      ...mapState(['user_status'])
    },
    methods: {
      ...mapActions(['get_user_public'])
    },
    mounted() {
      this.get_user_public()
    }
  }
</script>

<style lang="less" scoped>
  // 用户状态
  .user-status {
    margin: 0 2rem 0 0;

    a {
      text-decoration: none;
    }

    .user-message {
      color: #777777;
      font-size: 1rem;

      span {
        height: 1.4rem;
        line-height: 1.4rem;
      }
      .user-avatar-default {
        margin-bottom: -4px;
        height: 1.4rem;
        margin-right: 8px;
      }
    }
  }
</style>