<template>
  <div id="app">
    <el-container>
      <el-header>
        <music-header></music-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>Main
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import musicHeader from './components/music-header';
import Aside from './components/Aside';
export default {
  components: {
    musicHeader,
    Aside
  },
  data () {
    return {};
  }
};
</script>
<style lang="less">
  .el-header {
    background-color: #ec4141;
    color: #333;
    line-height: 60px;
  }
  .el-footer {
    background-color: #ffffff;
    color: #333;
    border-top: 1px solid #e1e1e1;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    border-right: 1px solid #e1e1e1;
    /*line-height: 100%;*/
    height: calc(100vh - 140px);
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    height: calc(100vh - 140px);
  }

</style>
