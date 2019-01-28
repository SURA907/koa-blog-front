<template>
  <div class="content">
    <div class="back-home">
      <router-link to="/">SURA</router-link>
    </div>
    <div class="title-content">
      <router-link to="/signup" class="btn-login">注册</router-link>
    </div>
    <div class="input-content">
      <el-input
        id="input-username"
        v-model="input_data_username"
        placeholder="用户名"
        size="small"
        autofocus="autofocus"
        prefix-icon="el-icon-view"/>

      <el-input
        id="input-password"
        type="password"
        v-model="input_data_password"
        placeholder="密码（至少六位）"
        size="small"
        @focus="onActiveInputPassword"
        prefix-icon="el-icon-edit"/>

      <el-input
        type="password"
        v-model="input_data_password_again"
        placeholder="确认密码"
        size="small"
        @focus="onActiveInputPasswordAgain"
        prefix-icon="el-icon-edit"/>

      <el-input
        v-model="input_data_mail"
        size="small"
        placeholder="邮件"
        @focus="onActiveInputMail"
        prefix-icon="el-icon-message"/>

      <!-- 输入状态图标 -->
      <i v-show="active_input_password"
        class="input-status-ico password-status"
        :class="{'el-icon-close': !password_allowed, 'el-icon-check': password_allowed}"></i>

      <i v-show="active_input_password_again"
        class="input-status-ico password-again-status"
        :class="{'el-icon-close': !password_same, 'el-icon-check': password_same}"></i>

      <i v-show="active_input_mail"
        class="input-status-ico mail-status"
        :class="{'el-icon-close': !mail_allowed, 'el-icon-check': mail_allowed}"></i>

      <div class="input-verification-code">
        <el-input
          v-model="input_data_verification_code"
          size="small"
          placeholder="验证码"
          prefix-icon="el-icon-bell"/>

        <el-button
          class="send-mail"
          @click="sendMail"
          v-if="send_mail_status === null"
          :disabled="!mail_allowed">发送验证码</el-button>

        <el-button
          class="send-mail"
          v-else
          disabled>重发({{interval}}s)</el-button>
      </div>
    </div>
    <div class="btn-content">
      <span>不想注册了？<a @click="back" class="btn-back">返回</a></span>

      <el-button
        class="btn-submit"
        @click="submit"
        :disabled="!password_allowed || !password_same || input_data_verification_code.length !== 6 || input_data_username.trim() === ''"
        >提交</el-button>

    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'element-ui'
  import axios from './../http'
  import API from './../store/api'
  export default {
    name: "SignUp",
    data() {
      return {
        input_data_username: '',
        input_data_password: '',
        input_data_password_again: '',
        input_data_mail: '',
        input_data_verification_code: '',
        send_mail_status: null,
        interval: null,
        active_input_password: false,
        active_input_password_again: false,
        active_input_mail: false
      }
    },
    computed: {
      // 密码长度是否大于六位
      password_allowed() {
        return this.input_data_password.trim().length >= 6
      },
      // 两次输入的密码是否一致
      password_same() {
        return this.input_data_password.trim() === this.input_data_password_again.trim() && this.input_data_password.trim().length >= 6
      },
      // 邮件格式
      mail_allowed() {
        let mail_reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        return mail_reg.test(this.input_data_mail)
      }
    },
    methods: {
      /* input password 获取焦点 */
      onActiveInputPassword() {
        this.active_input_password = true
      },
      /* input password-again 获取焦点 */
      onActiveInputPasswordAgain() {
        this.active_input_password_again = true
      },
      /* input mail 获取焦点 */
      onActiveInputMail() {
        this.active_input_mail = true
      },
      /* 返回上一个页面 */
      back() {
        window.history.back()
      },
      /* messageBox封装 */
      myMessageBox(title, message, type, callback=null) {
        if (typeof callback === 'function') {
          MessageBox.alert(message, title, {
            type: type,
            confirmButtonText: '确定',
            callback: callback
          })
        } else {
          MessageBox.alert(message, title, {
            type: type,
            confirmButtonText: '确定'
          })
        }
      },
      /* 发送验证码 */
      sendMail() {
        let url = API.MAIL_SIGN_UP
        let mail = this.input_data_mail.trim().toLowerCase()
        this.interval = 60
        let timer = setInterval(() => {
          if (this.interval !== 0) {
            this.interval--
          } else {
            this.interval = null
            this.send_mail_status = null
            clearInterval(timer)
          }
        }, 1000)
        this.send_mail_status = 'sending'
        // 发送邮件
        axios.post(url, {
          mail: mail
        }).then(res => {
          let result = res.data
          if (result.code === 0) {
            // 邮件发送成功
            this.myMessageBox('成功', `邮件发送成功，SURA发送的邮件十有八九会出现在'垃圾箱'中，请注意查收::>_<::`, 'success')
          } else {
            // 邮件发送失败
            this.interval = null
            this.send_mail_status = null
            clearInterval(timer)
            this.myMessageBox('失败', result.message, 'error')
          }
        })
      },
      /* 用户注册 */
      submit() {
        let url = API.USER_SIGN_UP
        let username = this.input_data_username.trim()
        let password = this.input_data_password.trim()
        let mail = this.input_data_mail.trim().toLowerCase()
        let verification_code = this.input_data_verification_code.trim()
        // 发送注册请求
        axios.post(url, {
          username,
          password,
          mail,
          verification_code
        }).then(res => {
          let result = res.data
          if (result.code === 0) {
            // 注册成功
            this.myMessageBox('成功', '注册成功', 'success', () => {
              this.back()
            })
          } else {
            // 注册失败
            this.myMessageBox('失败', result.message, 'error')
          }
        })
      },
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
      position: relative;

      .input-status-ico {
        position: absolute;
        top: 40px;
        left: 280px;
      }
      .password-again-status {
        top: 72px;
      }
      .mail-status {
        top: 104px;
      }
      .input-verification-code {
        .el-input {
          width: 60%;
        }
        .send-mail {
          width: 40%;
          padding: 8px 0;
          outline: none;
        }
      }
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