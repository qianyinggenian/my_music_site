<template>
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
            <span>{{playlist.createTime}}</span>
          </div>

        </div>
      </div>

    </div>
    <div class="bottom">
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
        >
          <!--        <template slot-scope="scope">-->
          <!--          <span>formatDuration(scope.row.dt)</span>-->
          <!--        </template>-->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data () {
      return {
        createTime: ''
      };
    },
    props: {

      /* 表格数据 */
      tableData: {
        type: Array,
        default: () => ([])
      },
      playlist: {
        type: Object,
        default: () => {}
      }
    },
    created () {
      console.log('createTime', playlist);
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else  {
          return '';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    margin: 10px;
    overflow: auto;
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
  }
</style>
