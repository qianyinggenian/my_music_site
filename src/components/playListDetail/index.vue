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
              <!--            <el-avatar size="small" :src="playlist.creator.avatarUrl"></el-avatar>-->
              <div class="avatar" :style="{background: 'url(' + playlist.creator.avatarUrl +')', backgroundSize:'contain'}">
                <img :src="playlist.creator.avatarDetail.identityIconUrl" alt="">
              </div>
            </div>
            <div>
              <span class="username">{{playlist.creator.nickname}}</span>
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
          <div class="summary">
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
            >
              <el-table-column
                  type="index"
                  width="40">
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
                  sortable>
              </el-table-column>
              <el-table-column
                  prop="singer"
                  label="歌手"
                  width="200px"
                  sortable>
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.ar" :key="index">{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="album"
                  label="专辑"
                  sortable
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
          <el-tab-pane label="评论" name="second">评论</el-tab-pane>
          <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import tableMix from './tableMix';
  // import commonTable from '../commonTable';
  // import Table from '../table';
  export default {
    name: "index",
    components: {
      // commonTable,
      // Table
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
        createTime: ''// 创建时间
      };
    },
    methods: {
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
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: id
          },
        });
        if (data.code === 200) {
          this.playlist = data.playlist;
          this.tableData = data.playlist.tracks;
          // this.createTime = data.playlist.createTime;
          let date = new Date(data.playlist.createTime);
          console.log('date', date);
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
      handleClick () {},
    }
  }
</script>


<style lang="less" scoped>
  .container {
    margin: 10px;
    /*overflow: auto;*/
    /*height: calc(100vh - 160px);*/
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
    /deep/ .el-table .warning-row {
      background: oldlace;
    }

    /deep/ .el-table .success-row {
      background: #f0f9eb;
    }
    .Icon {
      margin: 0 5px;
    }
    /*/deep/ .cell {*/
    /*  overflow:hidden;*/
    /*  white-space: nowrap;*/
    /*  text-overflow: ellipsis;*/
    /*  -o-text-overflow:ellipsis;*/
    /*}*/
    /deep/ .el-tabs__content {
      overflow: hidden !important;
    }
  }
</style>
