<template>
  <div>
    <div class="container">
      <div class="top">
        <div class="left">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
        <div class="right">
          <div class="title">
            <span>歌单</span>
            <span>{{playlist.name}}</span>
          </div>
          <div class="user">
            <div>
<!--                 <el-avatar v-if="avatarUrl.length > 0" size="small" :src="avatarUrl"></el-avatar>-->
              <div class="avatar" v-if="avatarUrl.length > 0" :style="{background: 'url(' + playlist.creator.avatarUrl +')', backgroundSize:'contain'}">
                <img v-if="identityIconUrl.length > 0 " :src="identityIconUrl" alt="">
              </div>
            </div>
            <div>
              <span class="username" v-if="nickname.length">{{nickname}}</span>
              <span class="createTime">{{createTime}}创建</span>
            </div>

          </div>
          <div class="btn">
            <div class="play">
              <div>
                <i class="el-icon-caret-right"></i>
                <span>播放全部</span>
              </div>
              <div>
                <i class="el-icon-plus"></i>
              </div>

            </div>
            <div class="btnOne">
              <i class="icon iconfont icon-shoucang1 Icon"></i>
              <span>收藏（{{playlist.subscribedCount}}）</span>
            </div>
            <div class="btnOne">
              <i class="icon iconfont icon-fenxiang Icon"></i>
              <span>分享（{{playlist.shareCount}}）</span>
            </div>
            <div class="btnOne">
              <i class="icon iconfont icon-xiazai1 Icon"></i>
              <span>下载全部</span>
            </div>
          </div>
          <div class="label">
            <span>标签:</span>
            <span class="span" v-for="(item, index) in playlist.tags" :key="index">
               {{item}}
               <span v-if="playlist.tags.length-1 !== index">/</span>
             </span>
          </div>
          <div class="song">
            <span>歌曲：{{playlist.trackCount}}</span>
            <span>播放：{{playlist.playCount}}</span>
          </div>
          <div class="summary" :title="`${playlist.description}`">
            <span>简介：{{playlist.description}}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲列表" name="first">
            <el-table
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              @cell-dblclick="cellDblclick"
            >
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="icon"
                label=""
                width="80"
              >
                <template slot-scope="scope">
                  <i class="icon iconfont icon-shoucang Icon"></i>
                  <i class="icon iconfont icon-xiazai Icon"></i>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="音乐标题"
                show-overflow-tooltip
                sortable>
              </el-table-column>
              <el-table-column
                prop="singer"
                label="歌手"
                width="200px"
                show-overflow-tooltip
                sortable>
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.ar" :key="index">{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="album"
                label="专辑"
                sortable
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="duration"
                label="时长"
                sortable
                width="80"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="`评论(${commentTotal})`" name="second">
            <commentPlaylist
                v-loading="loading"
                :comments="comments"
                :hotComments="hotComments"
                :commentTotal="commentTotal"
                :playListDetailId="playListDetailId"
            >
            </commentPlaylist>
          </el-tab-pane>
          <el-tab-pane label="收藏者" name="third">
            <subscribers :list="list"></subscribers>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import tableMix from './tableMix';
  import subscribers from '../subscribers';
  import commentPlaylist from '../commentPlaylist';
  import axios from 'axios';
  // import commonTable from '../commonTable';
  // import Table from '../table';
  export default {
    name: "index",
    components: {
      // commonTable,
      // Table
      subscribers,
      commentPlaylist
    },
    mixins: [
      tableMix
    ],
    data () {
      return {
        activeName: 'first',
        tableData: [],
        singers: [], // 歌手
        playlist: {},
        createTime: '',// 创建时间
        playListDetailId: null,
        list: [],
        avatarUrl: '',
        nickname: '',
        identityIconUrl: '',
        comments: [], // 最新评论
        hotComments: [], // 精彩评论
        commentTotal: 0, // 评论总条数
        topLoading: true,
        loading: true
      };
    },
    watch: {
      '$route': {
        handler (val) {
          if (val && val.length > 0) {
          }
          this.getInfo();
        },
        immediate: true
      }
    },
    mounted() {
      this.fn();
      // this.getPlaylistSubscribersFn();
      // this.getCommentPlaylistFn();
      //
    },
    methods: {
      // 双击播放
      cellDblclick (row, column, cell, event) {
        this.$store.dispatch('getSongUrlFn', row.id);
        this.$store.dispatch('getSongDetailFn', row.id);
        this.$message({
          message: '已添加到播放列表',
          type: 'success'
        });
      },
      getInfo() {
        const id = Number(this.$route.query.id);
        this.getPlayListDetailFn(id);
      },
      // 表格样式
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else  {
          return '';
        }
      },
      // 获取歌单详情
      async getPlayListDetailFn(id) {
        this.playListDetailId = id;
        this.getPlaylistSubscribersFn();
        this.getCommentPlaylistFn();
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: id
          },
        });
        if (data.code === 200) {
          this.playlist = data.playlist;
          this.tableData = data.playlist.tracks; // 歌单列表
          this.avatarUrl = this.playlist.creator.avatarUrl; // 创建者头像
          this.nickname = this.playlist.creator.nickname; // 创建者
          // 创建者身份标识
          this.identityIconUrl = this.playlist.creator.avatarDetail ? this.playlist.creator.avatarDetail.identityIconUrl : '';
          let date = new Date(data.playlist.createTime);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (month < 10) {
            month = '0' + month
          }
          if (day < 10) {
            day = '0' + day
          }
          this.createTime = year + '-' + month + '-' + day;
          for (const key of this.tableData) {
            key.album = key.al.name; // 专辑
            for (const val of key.ar) {
              key.singer = val.name;
            }
            key.duration = this.formatDuration(key.dt);// 时长
          }
          this.topLoading = false;
        }
      },
      // 歌曲时长转换
      formatDuration(duration) {
        // 分钟：向下取整，转为字符，不足两位前边补零
        // 毫秒 换算成 分：秒形式，即 00:00
        //duration / 1000得到秒，再除以60得到分
        let minute = Math.floor(duration / 1000 / 60).toString().padStart(2, '0');
        // .toString().padStart(2, '0')
        //duration / 1000得到秒，再除以60得到分
        let second = Math.floor(duration /1000 % 60).toString().padStart(2, '0');
        return minute + ':' + second
      },
      // 歌单收藏者
      async getPlaylistSubscribersFn () {
        const { data } = await this.$axios.get('/playlist/subscribers', {
          params: {
            id: this.playListDetailId,
            limit: 100
          }
        });
        if (data.code === 200 ) {
          this.list = data.subscribers;
        }
      },
      // 歌单评论
      async getCommentPlaylistFn () {
        const { data } = await this.$axios.get('/comment/playlist', {
          params: {
            id: this.playListDetailId,
            limit: 100
          }
        });
        if (data.code === 200) {
          this.comments = data.comments;
          this.hotComments = data.hotComments;
          this.commentTotal = data.total;
        }
        for (const key of this.comments) {
          key.date = this.changeFormatTimeFn(key.time);
        }
        for (const key of this.hotComments) {
          key.date = this.changeFormatTimeFn(key.time);
        }
        this.loading = false;
      },
      changeFormatTimeFn (time) {
        let date = new Date(time);
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let days = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (month < 10) {
          month = '0' + month
        }
        if (days < 10) {
          days = '0' + days
        }
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        return years + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
      },
      handleClick () {
        if (this.activeName === 'first') {

        } else if (this.activeName === 'second') {
          this.getCommentPlaylistFn();
        } else {
          this.getPlaylistSubscribersFn();
        }
      },
    }
  }
</script>


<style lang="less" scoped>
  .container {
    margin: 10px;
    overflow: auto;
    height: 100%;
    /*height: calc(100vh - 200px);*/
  }
  .top {
    height: 250px;
    display: flex;
    .left {
      width: 210px;
      img {
        width: 200px;
      }
    }
    .right {
      .title {
        margin: 5px;
        span:nth-child(1) {
          color: #ec4141;
          padding: 0 5px;
          border: 1px solid #ec4141;
          margin-right: 10px;
          font-size: 14px;
        }
        span:nth-child(2) {
          color: #373737;
          font-size: 24px;
          font-family:"STHeiti"; // 黑体
          font-weight: 800; // 加粗
        }
      }
      .user {
        margin: 10px;
        display: flex;
        .el-avatar--small {
          /*margin: 10px !important;*/
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 16px;
          position: relative;
          img {
            width: 15px;
            height: 15px;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
        .username {
          color: #56A2E8;
          padding: 0 10px;
          line-height: 32px;
        }
        .createTime {
          font-size: 10px;
          color: #9f9f9f;
        }
      }
      .btn {
        display: flex;
        .play {
          background-color: #ec4141;
          display: flex;
          color: white;
          height: 30px;
          line-height: 30px;
          padding: 2px;
          border-radius: 20px;
          i {
            font-size: 20px;
            padding: 0 5px;
          }
        }
        .btnOne {
          margin: 0 10px;
          padding: 2px 10px;
          display: flex;
          height: 30px;
          line-height: 30px;
          /*padding: 2px;*/
          border: 1px solid #9f9f9f;
          border-radius: 20px;
          i {
            font-size: 20px;
            padding: 0 5px;
          }
        }
      }
      .label {
        margin: 10px;
        font-size: 14px;
        .span {
          color: #56A2E8;
        }
      }
      .song {
        margin: 10px;
        font-size: 14px;
        span {
          padding-right: 10px;
        }
      }
      .summary {
        margin: 10px;
        font-size: 14px;
        width: 300px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
      }
    }
  }
  .bottom {
    height: calc(100vh - 420px);
    /deep/ .el-table .warning-row {
      background: oldlace;
    }

    /deep/ .el-table .success-row {
      background: #f0f9eb;
    }
    .Icon {
      margin: 0 5px;
    }
    /deep/ .el-tabs__content {
      overflow: hidden !important;
    }
  }
</style>
