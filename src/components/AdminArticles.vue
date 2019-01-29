<template>
  <div class="content">
    <div class="operating">
      <div class="title">操作</div>
      <div class="operating-content">
        <el-button
          class="btn-create-article el-icon-edit"
          @click="to_create_article">&nbsp;写文章</el-button>
        <hr>
      </div>
    </div>
    <div class="article-admin">
      <div class="title">文章管理</div>
      <ul class="article-list">
        <li class="article-item" v-for="(item, index) in articles_list" :key="index">
          <router-link
            :to="'/articles/'+item._id"
            class="article-title">#{{index+1}}&nbsp;{{item.title}}</router-link>
          <div class="article-description">{{item.description}}</div>
          <div>
            <span class="author el-icon-edit-outline">&nbsp;{{item.user}}</span>
            <span class="create_at el-icon-date">&nbsp;张贴于{{item.create_at}}</span>
          </div>
          <el-button
            class="el-icon-edit"
            @click="edit_article(item._id)">&nbsp;编辑</el-button>
          <el-button
            class="el-icon-delete"
            @click="delete_article(item._id, item.title, index)">&nbsp;删除</el-button>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox, Notification} from 'element-ui'
  import axios from '../http'
  import API from '../api'
  import moment from 'moment'
  export default {
    name: "AdminArticles",
    data() {
      return {
        articles_list: []
      }
    },
    computed: {
      ...mapState(['user_status'])
    },
    mounted() {
      if (this.user_status.sign_in_status !== 'sign_in') {
        // 未登录
        MessageBox.alert('登陆后才可以管理文章', '警告', {
          type: 'warning',
          confirmButtonText: '确定',
          callback: () => {
            window.history.back()
          }
        })
      } else {
        // 已登录
        // 加载文章列表
        this.load_article_list()
      }
    },
    methods: {
      to_create_article() {
        this.$router.push({
          path: '/articles/new'
        })
      },
      load_article_list() {
        let url = API.GET_ARTICLE_OWN
        axios.get(url).then(res => {
          let result = res.data
          if (result.code === 0) {
            // 成功
            // 格式化数据
            result.data.forEach(item => {
              item.create_at = moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')
              item.update_at = moment(item.update_at).format('YYYY-MM-DD HH:mm:ss')
            })
            this.articles_list = result.data
          } else {
            // 失败
            MessageBox.alert(result.message, '失败', {
              type: 'error',
              confirmButtonText: '确定'
            })
          }
        })
      },
      edit_article(id) {
        this.$router.push('/articles/edit/'+id)
      },
      delete_article(id, title, index) {
        MessageBox.confirm(`确认删除文章'${title}'?`, '确认删除？', {
          type: 'warning',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          // 确认删除
          let url = API.ARTICLE+id
          axios.delete(url).then(res => {
            let result = res.data
            if (result.code === 0) {
                // 在本地数组中删除元素
              this.articles_list.splice(index, 1)
              Notification({
                title: '成功',
                message: '成功删除文章',
                type: 'success',
                position: 'bottom-left'
              })
            } else {
              MessageBox.alert(result.message, '失败', {
                type: 'error',
                confirmButtonText: '确定'
              })
            }
          })
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background-color: #979797;

    .operating {
      width: 96%;
      border: 1px #1c1c1c solid;
      border-radius: 12px;
      margin: 6px auto 0;
      padding: 12px 0;
      background-color: #ffffff;

      .title {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        padding: 6px 0;
        background-color: #4078c0;
        border-radius: 6px;
      }
      .operating-content {
        width: 90%;
        margin: 20px auto 0;
        background-color: #bbffaa;

        .btn-create-article {
          background-color: #42c02e;
          color: #f4f4f4;
          transition: background-color,color 0.3s,0.3s;
          border-radius: 6px;
          font-size: 18px;
          margin: 12px;
          outline: none;
          border: none;
        }
        .btn-create-article:hover {
          background-color: #bbffaa;
          color: #1c1c1c;
        }
      }
    }
    .article-admin {
      width: 96%;
      border: 1px #1c1c1c solid;
      border-radius: 12px;
      margin: 6px auto 0;
      padding: 12px 0;
      background-color: #ffffff;

      .title {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        padding: 6px 0;
        background-color: #4078c0;
        border-radius: 6px;
      }
      .article-list {
        width: 90%;
        margin: 20px auto 0;

        .article-item {
          padding: 12px;
          background-color: #bbffaa;
          margin-bottom: 12px;
          border-radius: 6px;

          .article-title {
            font-size: 22px;
            font-weight: bolder;
            color: #1c1c1c;
            margin-bottom: 5px;
            text-decoration: none;
          }
          .article-description {
            margin: 4px 0 4px 5px;
            font-size: 16px;
            color: #999999;
          }
          .author {
            font-size: 14px;
            color: #787878;
          }
          .create_at {
            font-size: 14px;
            margin-left: 8px;
            color: #787878;
          }
          button {
            padding: 8px 15px;
            margin-top: 4px;
            background-color: #ea6f5a;
            color: #bbffaa;
            transition: background-color,color 0.3s,0.3s;
            border-radius: 6px;
            outline: none;
            border: none;
          }
          button:hover {
            background-color: #bbffaa;
            color: #ea6f5a;
          }
        }
      }
    }
  }
</style>