<template>
  <div class="content">
    <div class="title">
      发现音乐
    </div>
    <div class="title">
      视频
    </div>
    <div class="title">
      朋友
    </div>
    <div class="title">
      直播
    </div>
    <div class="title">
      私人FM
    </div>
    <div class="myMusic">
      我的音乐
    </div>
    <div class="title">
      <i class="icon iconfont icon-yinle"></i>
      本地音乐
    </div>
    <div class="title">
      <i class="icon iconfont icon-xiazai"></i>
      下载管理
    </div>
    <div class="title">
      <i class="icon iconfont icon-yinle"></i>
      我的音乐云盘
    </div>
    <div class="title">
      <i class="icon iconfont icon-xiazai"></i>
      我的电台
    </div>
    <div class="title">
      <i class="icon iconfont icon-yinle"></i>
      我的收藏
    </div>
    <div class="songList">
      <div class="left">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="创建的歌单" name="1">
            <div class="Collection">
              <div class="CollectionOne"><i class="icon iconfont icon-shoucang"></i>收藏</div>
              <div class="CollectionTwo"><i class="icon iconfont icon-shoucang shoucang"></i></div>
            </div>
            <div v-for="(item,index) in songList" :key="index">
              <i class="icon iconfont icon-yinle"></i>
            </div>
            <div><i class="icon iconfont icon-yinle"></i>音乐</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {
    },
    data () {
      return {
        activeNames: '',
        songList: []
      };
    },
    methods: {
      handleChange () {}
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 10px;
    .title {
      height: 20px;
      padding: 10px;
    }
    .title:hover {
      background: #f6f6f7;
      border-radius: 5px;
    }
    .myMusic {
      height: 20px;
      padding: 10px;
      font-size: 14px;
      color: #999999;
    }
    .songList {
      display: flex;
      height: 20px;
      padding: 10px 0;
      font-size: 14px;
      .left {
        width: calc(100vh - 15px);
        display: flex;
        /deep/ .el-collapse {
          border-top: none;
          border-bottom: none !important;
          width: 170px;
          .el-collapse-item__header {
            border: none;
            height: 20px;
            color: #999999;
            .el-icon-arrow-right:before {
              content: "\e791" !important;
            }
            .el-collapse-item__arrow.is-active {
              transform: rotate(90deg);
              position: absolute;
              left: 100px;
            }
            .el-icon-arrow-right {
              position: absolute;
              left: 100px;
            }
          }
        }
        .Collection {
          display: flex;
          .CollectionOne {
            width: 150px;
          }
          .CollectionTwo {
            width: 60px;
            text-align: center;
            border: 1px solid #999999;
            border-radius: 13px;
            i {
              font-size: 18px;
            }
          }
        }
      }
      .right {
        right: 0;
        width: 15px;
      }
    }
  }
</style>
