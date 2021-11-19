<template>
  <div id="app">
    <el-container>
      <el-header>
        <music-header></music-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside @aside="asideFn"></Aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
          <musicFooter @drawer="drawerFn"></musicFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import musicHeader from './components/music-header';
import Aside from './components/Aside';
import mainContent from './components/mainContent';
import musicFooter from './components/musicFooter';
export default {
  components: {
    musicHeader,
    Aside,
    mainContent,
    musicFooter
  },
  data () {
    return {
      type: 'music',
      activeType: 'first',
      flag: true
    };
  },
  methods: {
    drawerFn (item) {
      this.drawer = item;
    },
    asideFn (item) {
      this.type = item.type;
      this.activeType = item.value;
      const params = {
        flag: this.flag,
        type: this.type,
        activeType: this.activeType
      };
      // this.$nextTick(() => {
      //   this.$refs.mainContent.getFlag(params);
      // });
    }
  }
};
</script>
<style lang="less">
  .el-header {
    background-color: #ec4141;
    color: #333;
    line-height: 60px;
    width: 100%;
    min-width: 960px;
  }
  .el-footer {
    background-color: #ffffff;
    color: #333;
    border-top: 1px solid #e1e1e1;
    width: 100%;
    min-width: 960px;
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    border-right: 1px solid #e1e1e1;
    height: calc(100vh - 140px);
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    padding: 10px !important;
    overflow: hidden !important;
    /*overflow: auto;*/
    /*height: calc(100% - 250px);*/
    height: 100%;
    min-width: 1000px;
  }
</style>
