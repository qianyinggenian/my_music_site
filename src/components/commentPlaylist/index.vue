<template>
  <div class="container">
    <div class="input">
      <el-input
          type="textarea"
          :rows="2"
          maxlength="140"
          show-word-limit
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
    </div>
    <div class="btn">
      <div>
        <span>@</span>
        <span>#</span>
      </div>
      <div>
        <el-button size="small" round>评论</el-button>
      </div>
    </div>
    <div class="content">
      <div class="hotComments" v-if="hotComments.length > 0">
        <div class="title">精彩评论</div>
<!--        <div v-for="(item,index) in hotComments" :key="index">-->
<!--          <div class="info">-->
<!--            <div class="left">-->
<!--              <el-avatar :size="35" :src="item.user.avatarUrl"></el-avatar>-->
<!--            </div>-->
<!--            <div class="right">-->
<!--              <span class="username">{{item.user.nickname}}:</span>-->
<!--              <span class="">{{item.content}}</span>-->
<!--              <span class="time">-->

<!--            </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div v-for="(item,index) in hotComments" :key="index">
          <div class="info">
            <div class="left">
              <el-avatar :size="35" :src="item.user.avatarUrl"></el-avatar>
            </div>
            <div class="right">
              <div>
                <span class="username">{{item.user.nickname}}:</span>
                <span class="">{{item.content}}</span>
              </div>
              <div class="beReplied" v-if="item.beReplied.length > 0">
                <div v-for="(val, indx) in item.beReplied" :key="indx">
                  <span class="one">@{{val.user.nickname}}:</span>
                  <span class="two">{{val.content}}</span>
                </div>
              </div>
              <div class="time">
                <div class="timeLeft">
                  <span>{{item.date}}</span>
                </div>
                <div class="timeRight">
                  <span class="report">举报</span>
                  <span class="report">|</span>
                  <span><i class="icon iconfont icon-dianzan"></i>&nbsp;&nbsp;{{item.likedCount}}</span>
                  <span>|</span>
                  <span><i class="icon iconfont icon-fenxiang1"></i></span>
                  <span>|</span>
                  <span><i class="icon iconfont icon-pinglun"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="title">最新评论</div>
        <div v-for="(item,index) in comments" :key="index">
          <div class="info">
            <div class="left">
              <el-avatar :size="35" :src="item.user.avatarUrl"></el-avatar>
            </div>
            <div class="right">
<!--              <div>-->
<!--                <span class="username">{{item.user.nickname}}:</span>-->
<!--                <span class="">{{item.content}}</span>-->
<!--              </div>-->

              <div>
                <span class="username">{{item.user.nickname}}:</span>
                <span class="">{{item.content}}</span>
              </div>
              <div class="beReplied" v-if="item.beReplied.length > 0">
                <div v-for="(val, indx) in item.beReplied" :key="indx">
                  <span class="one">@{{val.user.nickname}}:</span>
                  <span class="two">{{val.content}}</span>
                </div>
              </div>
              <div class="time">
                <div class="timeLeft">
                  <span>{{item.date}}</span>
                </div>
                <div class="timeRight">
                  <span class="report">举报</span>
                  <span class="report">|</span>
                  <span><i class="icon iconfont icon-dianzan"></i>&nbsp;&nbsp;{{item.likedCount}}</span>
                  <span>|</span>
                  <span><i class="icon iconfont icon-fenxiang1"></i></span>
                  <span>|</span>
                  <span><i class="icon iconfont icon-pinglun"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        textarea: '',
        loading: true
      };
    },
    props: {
      comments: {
        type: Array,
        default: () => []
      },
      hotComments: {
        type: Array,
        default: () => []
      },
      commentTotal: {
        type: Number
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
.btn {
  margin-top: 10px;
  display: flex;
  height: 30px;
  position: relative;
  span {
    padding: 10px;
  }
  .el-button {
    position: absolute;
    right: 0;
  }
}
  .content {
    .title {
      font-weight: 600;
    }
    .comments {
      margin-top: 30px;
    }
    .info {
      position: relative;
      margin: 10px 0;
      display: flex;
      border-bottom: 1px solid #f2f2f2;
      .left {

      }
      .right {
        width: 100%;
        font-size: 12px;
        padding-left: 10px;
        .username {
          color: #0b7ccb;
        }
        .beReplied {
          border-radius: 5px;
          background-color: #f4f4f4;
          padding: 5px 5px;
          margin-top: 10px;
          .one {
            color: #0b7ccb;
          }
          .two {
            color: #636363;
          }
        }
        .time {
          margin-top: 10px;
          padding: 10px 0;
          /*position: relative;*/
        }
      }
      .timeRight {
        position: absolute;
        bottom: 0;
        right: 0;
        span {
          padding: 0 5px;
        }
      }
      .report {
        visibility: hidden;
      }
      &:hover .report {
        visibility: visible;
      }
    }
  }
</style>
