<template>
  <div class="header">
    <!-- logo开始-->
    <div class="logo">
      <i class="icon iconfont icon-guanjianci"></i>
      我的音乐
    </div>
    <!-- logo结束-->
    <!-- 搜索部分开始-->
    <div class="search">
      <div class="btn">
        <span class="el-icon-arrow-left left" @click="prev"></span>
        <span class="el-icon-arrow-right right"></span>
      </div>
      <div class="search-box">
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="small"
            v-model="searchValue">
        </el-input>
      </div>
      <div class="maikefeng">
        <span class="icon iconfont icon-maikefeng"></span>
      </div>
    </div>
    <!-- 搜索部分结束-->
<!--    <div class="empty"></div>-->
    <div class="setting">
      <div>
        <el-avatar class="user"> user </el-avatar>
      </div>
      <div class="username">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          未登录<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <div class="VIP">
        开通VIP
      </div>
      <div class="">
        <i class="icon iconfont icon-pifu icon"></i>
        <i class="el-icon-setting icon"></i>
        <i class="el-icon-message icon"></i>
        <el-divider direction="vertical"></el-divider>
        <i class="icon iconfont icon-zuixiaohua"></i>
        <i class="icon iconfont icon-zuixiaohua_huaban1"></i>
        <i class="icon iconfont icon-zuidahua"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        searchValue: ''
      };
    },
    methods: {
      prev () {
        this.$router.go(-1);
        console.log(11111);
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    color: #ffffff;
    display: flex;
    width: 100%;
    .logo {
      font-size: 20px;
      width: 200px;
    }
    .search {
      width: calc(100% - 600px);
      display: flex;
      .left, .right {
        margin-right: 15px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        color: red;
        border-radius: 10px;
        background: #ffffff;
        filter:alpha(opacity=50);
        -moz-opacity:0.5;
        -khtml-opacity: 0.5;
        opacity: 0.5;
      }
      .search-box {
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 20px;
          opacity: 0.5;
        }
      }
      .maikefeng {
        padding-left: 10px;
      }
    }
    /*.empty {*/
    /*  width: calc(100% - 905px);*/
    /*}*/
    .setting {
      /*justify-content: flex-end;*/
      right: 0;
      display: flex;
      /*float: right;*/
      width: 400px;
      .user {
        display: inline-flex;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background: #C0C4CC;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        flex-direction: column;
      }
      .username {
        padding-left: 5px;
        .el-dropdown {
          color: #fff;
          /deep/ .el-icon-arrow-down:before {
            content: "\e790" !important;
          }
        }
      }
      .VIP {
        font-size: 14px;
        padding-left: 5px;
      }
      .icon {
        padding: 10px;
      }
    }
  }
</style>
