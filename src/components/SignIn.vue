<template>
  <div class="content">
    <div class="back-home">
      <router-link to="/">SURA</router-link>
    </div>
    <div class="title-content">
      <router-link to="/signin" class="btn-login">登录</router-link>
    </div>
    <div class="input-content">
      <el-input
        v-model="input_data_username"
        placeholder="用户名"
        size="small"
        prefix-icon="el-icon-view"/>

      <el-input
        type="password"
        v-model="input_data_password"
        placeholder="密码"
        size="small"
        prefix-icon="el-icon-edit"/>

    </div>
    <div class="btn-content">
      <span>不想登录了？<a @click="back" class="btn-back">返回</a></span>
      <el-button class="btn-submit" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {Notification} from 'element-ui'
  export default {
    name: "SignIn",
    data() {
      return {
        input_data_username: '',
        input_data_password: ''
      }
    },
    methods: {
      back() {
        window.history.back()
      },
      submit() {
        let username = this.input_data_username || ''
        let password = this.input_data_password || ''
        if (username.trim() === '' || password.trim() === '') {
          Notification({
            title: '警告',
            message: '用户名或密码不能为空',
            type: 'warning',
            position: 'bottom-left'
          })
        } else {
          username = username.trim()
          password = password.trim()
          Notification({
            title: '成功',
            message: '施工中',
            type: 'success',
            position: 'bottom-left'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    width: 36%;
    margin: 6rem auto 0;
    padding: 2rem 0 3rem 0;
    background-color: #f7f7f7;

    .back-home {
      position: absolute;
      top: 2rem;
      left: 1rem;
      font-size: 3rem;

      a {
        text-decoration: none;
      }
    }
    .title-content {
      width: 60%;
      text-align: center;
      margin: 0 auto 5rem;

      a {
        text-decoration: none;
      }

      .btn-login {
        font-size: 1.4rem;
      }
    }

    .input-content {
      width: 60%;
      margin: 0 auto;
    }

    .btn-content {
      width: 60%;
      margin: 2rem auto;
      text-align: left;
      font-size: 0.8rem;
      color: blue;

      span {
        margin: 0 0 0 0.6rem;
      }

      .btn-back {
        cursor: pointer;
      }

      .btn-submit {
        margin: 0 0 0 5.6rem;
        border-radius: 0.8rem;
      }
    }
  }
</style>