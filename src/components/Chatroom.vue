<template>
  <div class="content">
    <div class="title">欢迎进入聊天室</div>
    <div class="chat-home">
      <ul
        class="chat-content"
        ref="chat_content">
        <transition-group name="chat-items">
          <li
            class="chat-item"
            v-for="(item, index) in message_items"
            :key="index">
            <img class="user-avatar" src="../assets/user-avatar.png">
            <span class="author">{{item.user}}</span>
            <span class="create_at">{{item.create_at}}</span>
            <div class="chat-message">{{item.message}}</div>
            <div class="fix-float"></div>
          </li>
        </transition-group>
      </ul>
      <div class="send-chat">
        <el-input
          class="input-message"
          v-model.trim="input_message"
          :disabled="user_status.sign_in_status === 'sign_out'"
          @keydown.enter.native="send_message"
          placeholder="请输入内容">
          <el-button
            slot="append"
            icon="el-icon-upload2"
            :disabled="user_status.sign_in_status === 'sign_out'"
            @click="send_message">send</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  import moment from 'moment'
  import {mapState} from 'vuex'
  import {MessageBox} from 'element-ui'
  import API from '../../api'

  const socket = io(`${API.BASE_URL}:3000`)
  export default {
    name: "Chatroom",
    data() {
      return {
        message_items: [],
        input_message: ''
      }
    },
    computed: {
      ...mapState(['user_status'])
    },
    methods: {
      send_message() {
        if (this.user_status.sign_in_status === 'sign_in') {
          socket.emit('chat message', {
            token: this.user_status.token,
            message: this.input_message
          })
          this.input_message = ''
        }
      }
    },
    mounted() {
      socket.on('chat message', ({code, user, user_id, create_at, message}) => {
        if (code !== 0) {
          // 错误信息
          MessageBox.alert(message, '错误', {
            type: 'error',
            confirmButtonText: '确定'
          })
        } else {
          create_at = moment(create_at).format('YYYY-MM-DD HH:mm:ss')
          this.message_items.push({
            user,
            user_id,
            create_at,
            message
          })
          setTimeout(() => {
            let chat_content = this.$refs.chat_content
            if (chat_content.scrollHeight) {
              chat_content.scrollTop = chat_content.scrollHeight - chat_content.clientHeight
            }
          }, 0)
        }
      })
    },
  }
</script>

<style lang="less" scoped>
  .content {
    background-color: #f4f4f4;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    .title {
      /*background-color: #cccccc;*/
      text-align: center;
      font-size: 22px;
      margin: 12px 0;
    }

    .chat-home {

      .chat-items-enter-active {
        transition: opacity .6s;
      }
      .chat-items-enter {
        opacity: 0;
      }
      .chat-content {
        width: 80%;
        height: 70vh;
        margin: 0 auto;
        overflow: auto;

        .chat-item {
          padding: 12px 0;

          .user-avatar {
            float: left;
            width: 32px;
            margin: 0 12px;
          }
          .author {
            font-size: 18px;
            margin-right: 8px;
          }
          .create_at {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
          }
          .chat-message {
            font-size: 16px;
          }
          .fix-float {
            clear: both;
          }
        }
        .chat-item:nth-child(odd) {
          background-color: #ffffff;
        }
      }
      .send-chat {
        width: 80%;
        margin: 0 auto;
        float: bottom;

        .input-message {
          resize: none;
        }
      }
    }
  }
</style>
