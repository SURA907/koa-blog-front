<template>
  <div class="content">
    <h3 class="title">评论({{comments.length}})</h3>
    <div class="create-comment-content">
      <div v-if="user_status.sign_in_status === 'sign_out'">
        <router-link to="/signin">登录</router-link>
        <span>后才可以发表评论</span>
      </div>
      <div v-else>
        <textarea
          class="input-comment"
          v-model="input_data_comment_content"
          placeholder="在这里表达你对此文章的看法"></textarea>
        <div class="btn-home">
          <span>{{comment_length}}/120</span>
          <el-button
            class="btn-submit-comment"
            :disabled="comment_length > 120 || comment_length === 0"
            @click="submit_comment">提交</el-button>
          <hr>
        </div>
      </div>
    </div>
    <hr>
    <ul class="comment-content">
      <li class="comment-item" v-for="(comment, index) in comments" :key="index">
        <span class="author">{{comment.user}}</span>
        <span class="create_at">张贴于{{comment.create_at}}</span>

        <div class="parents" v-if="comment.parents">
          <div class="from">引用来自'{{comment.parents.user}}'的评论</div>
          <div class="from-content">{{comment.parents.content}}</div>
        </div>

        <div class="comment">{{comment.content}}</div>
        <div class="btn-home">
          <button
            class="el-icon-edit"
            v-if="user_status.sign_in_status === 'sign_in'"
            @click="get_reply_content(index)">回复</button>
          <button
            class="el-icon-delete"
            v-if="user_status.sign_in_status === 'sign_in' && user_status.id === comment.user_id"
            @click="delete_comment(comment._id)">删除</button>
        </div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox, Notification} from 'element-ui'
  import moment from 'moment'
  import axios from '../http'
  import API from '../../api'
  export default {
    name: "Comment",
    data() {
      return {
        comments: [],
        input_data_comment_content: '',
      }
    },
    computed: {
      ...mapState(['user_status']),
      comment_length() {
        return this.input_data_comment_content.trim().length
      }
    },
    methods: {
      /*添加评论*/
      submit_comment() {
        // 准备参数
        let article_id = this.$route.params['id'].trim()
        let content = this.input_data_comment_content.trim()
        this.create_comment(article_id, content)
      },

      /*删除评论*/
      delete_comment(comment_id) {
        let url = `${API.COMMENT}/${comment_id}`
        if (comment_id.length !== 24) {
          MessageBox.alert('参数不合法', '错误', {
            type: 'error',
            confirmButtonText: '确定'
          })
        } else {
          MessageBox.confirm('确认删除？', '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          }).then(() => {
            axios.delete(url).then(res => {
              let result = res.data
              if (result.code === 0) {
                // 删除评论成功
                Notification({
                  title: '成功',
                  message: '删除评论成功',
                  type: 'success',
                  position: 'bottom-left'
                })
                this.get_comments()
              } else {
                // 删除评论失败
                MessageBox.alert(result.message, '错误', {
                  type: 'error',
                  confirmButtonText: '确定'
                })
              }
            })
          })
        }
      },

      /*获取追评内容*/
      get_reply_content(index) {
        MessageBox.prompt('请输入追评内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S+/,
          inputErrorMessage: '输入内容不能为空'
        }).then(({value}) => {
          this.reply_comment(index, value)
        })
      },
      /*回复评论*/
      reply_comment(index, content) {
        let parents = {
          id: this.comments[index]._id,
          user: this.comments[index].user,
          user_id: this.comments[index].user_id,
          content: this.comments[index].content
        }
        let article_id = this.$route.params['id'].trim()
        content = content.trim()
        this.create_comment(article_id, content, parents)
      },
      /*创建评论*/
      create_comment(article_id, content, parents={}) {
        if (article_id.length !== 24 || content.length === 0) {
          // 参数不合法
          MessageBox.alert('参数不合法', '错误', {
            type: 'error',
            confirmButtonText: '确定'
          })
        } else {
          let url = `${API.COMMENT}?article_id=${article_id}`
          axios.post(url, {
            article_id,
            content,
            parents
          }).then(res => {
            let result = res.data
            if (result.code === 0) {
              // 请求成功
              // 格式化参数
              this.get_comments()
              this.input_data_comment_content = ''
              Notification({
                type: 'success',
                title: '成功',
                message: '评论发布成功',
                position: 'bottom-left'
              })
            } else {
              // 请求失败
              MessageBox.alert(result.message, '错误', {
                type: 'error',
                confirmButtonText: '确定'
              }).then(() => {
                window.reload()
              })
            }
          })
        }
      },
      /*获得当前文章的所有评论*/
      get_comments() {
        let article_id = this.$route.params['id'].trim()
        let url = `${API.COMMENT}?article_id=${article_id}`
        if (article_id.length !== 24) {
          // 参数不合法
          MessageBox.alert('参数不合法', '错误', {
            type: 'error',
            confirmButtonText: '确定'
          })
        } else {
          // 参数检测通过
          axios.get(url).then(res => {
            let result = res.data
            if (result.code === 0) {
              // 请求成功
              let data = result.data.map(item => ({
                _id: item._id,
                create_at: moment(item.create_at).format('YYYY-MM-DD HH:mm:ss'),
                update_at: moment(item.update_at).format('YYYY-MM-DD HH:mm:ss'),
                content: item.content,
                parents: item.parents,
                user: item.user,
                user_id: item.user_id
              }))
              this.comments = data
            } else {
              // 请求失败
              MessageBox.alert(result.message, '获取评论错误', {
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          })
        }
      },
    },
    mounted() {
      this.get_comments()
    }
  }
</script>

<style lang="less" scoped>
  .content {
    border: 1px #bbffaa solid;

    .title {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 1rem;
      /*text-align: center;*/
    }
    .create-comment-content {

      .input-comment {
        width: 98%;
        padding: 1%;
        height: 4rem;
        font-size: 1.2rem;
        margin-bottom: 5px;
        resize: none;
      }
      .btn-home {
        text-align: right;

        .btn-submit-comment {
          font-size: 1rem;
          color: #bbffaa;
          padding: 6px 18px;
          margin-left: 6px;
          border-radius: 8px;
          background-color: #42C02E;
          transition: background-color,color 0.3s,0.3s;
          border: none;
          outline: none;
        }
        .btn-submit-comment:hover {
          color: #1c1c1c;
          background-color: #ffffff;
        }
      }
    }
    .comment-content {

      .comment-item {
        .author {
          font-size: 1.2rem;
          font-weight: bold;
          margin-right: 1rem;
        }
        .create_at {
          font-size: 0.8rem;
          color: rgba(0, 0, 0, 0.4);
        }
        .parents {
          margin: 4px 0 0 1.4rem;
          padding: 0 0 0 0.6rem;
          border-left: 4px #dddddd solid;

          .from {
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .from-content {
            font-size: 0.9rem;
          }
        }
        .comment {
          font-size: 1rem;
          padding: 0.3rem 0 0.3rem 0.3rem;
          /*padding: 0 1.4rem;*/
        }
        .btn-home {
          button {
            margin-right: 0.6rem;
            cursor: pointer;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.4);
            background-color: rgba(0, 0, 0, 0);
            border: none;
            outline: none;
          }
        }
      }

    }
  }
</style>
