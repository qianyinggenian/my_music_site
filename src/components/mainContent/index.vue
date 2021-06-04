<template>
  <div class="content">
    <el-tabs v-if="type === 'music'" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first">
        <recommend ref="recommend" @recommend="musicFn"></recommend>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <songSheet ref="song"></songSheet>
      </el-tab-pane>
      <el-tab-pane label="主播电台" name="third">
        <radioStation ref="radio"></radioStation>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth">
        <rankingList ref="ranking"></rankingList>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="five">
        <singer ref="singer"></singer>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="six">
        <latestMusic ref="music"></latestMusic>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-if="type === 'video'" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="视频" name="first">
        <recommend></recommend>
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <songSheet></songSheet>
      </el-tab-pane>
    </el-tabs>
    <div v-if="type === 'friend'">
      ftygsrg
    </div>
  </div>
</template>

<script>
  import recommend from '../recommend';
  import rankingList from '../rankingList';
  import radioStation from '../radioStation';
  import latestMusic from '../latestMusic';
  import singer from '../singer';
  import songSheet from '../songSheet';
  export default {
    name: "index",
    components: {
      recommend,
      rankingList,
      radioStation,
      latestMusic,
      singer,
      songSheet
    },
    props: {
      type: {
        type: String,
        default: 'music'
      },
      activeType: {
        type: String,
        default: 'first'
      }
    },
    data () {
      return {
        activeName: 'first',
        // type: ''
      };
    },
    watch: {
      type: {
        handler (newVal) {
          this.activeName = this.activeType;
        }
      },
    },
    mounted() {
      // this.activeName = this.activeType;
      // console.log('this.activeName', this.activeName);
    },
    methods: {
      handleClick(tab, event) {

      },
      musicFn (params) {
        this.activeName = params.value;
      }
    }
  }
</script>

<style lang="less" scoped>
.content {
  height: calc(100% - 120px);
  /deep/ .el-tabs__content {
    /*overflow: hidden;*/
    position: relative;
    height: 550px;
    overflow: auto;
  }
}
</style>
