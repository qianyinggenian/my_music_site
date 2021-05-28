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
    <div class="">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index"
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
  }
</style>
