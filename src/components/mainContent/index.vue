<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first">
        <recommend></recommend>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <songSheet></songSheet>
      </el-tab-pane>
      <el-tab-pane label="主播电台" name="third">
        <radioStation></radioStation>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth">
        <rankingList></rankingList>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="five">
        <singer></singer>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="six">
        <latestMusic></latestMusic>
      </el-tab-pane>
    </el-tabs>
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
    data () {
      return {
        activeName: ''
      };
    },
    methods: {
      handleClick () {}
    }
  }
</script>

<style lang="less" scoped>

</style>
