<template>
  <div class="container">
    <div class="content" v-if="flag">
      <el-tabs class="tabs" v-if="type === 'music'" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="个性推荐" name="first">
            <recommend ref="recommend" @recommend="musicFn" @playList="playListFn"></recommend>
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
      </div>
    </div>
    <playListDetail class="playListDetail" v-if="!flag" ref="playListDetail"></playListDetail>
  </div>
</template>

<script>
  import recommend from '../recommend';
  import rankingList from '../rankingList';
  import radioStation from '../radioStation';
  import latestMusic from '../latestMusic';
  import singer from '../singer';
  import songSheet from '../songSheet';
  import playListDetail from '../playListDetail';
  export default {
    name: "index",
    components: {
      recommend,
      rankingList,
      radioStation,
      latestMusic,
      singer,
      songSheet,
      playListDetail
    },
    props: {
    },
    data () {
      return {
        activeName: 'first',
        isShowPlayListDetail: false,
        playListDetailId: '',
        flag: true,
        type: 'music',
        drawer: this.$store.state.drawer
      };
    },
    watch: {
      '$route': {
        handler (val) {
          this.getInfo();
        },
        immediate: true
      }
    },
    mounted () {

    },
    methods: {
      getInfo() {
        this.flag = true;
        if (Object.keys(this.$route.query).length === 0) {
          this.type = 'music';
          this.activeName = 'first';
        } else {
          this.type = this.$route.query.type ? this.$route.query.type : this.type;
          this.activeName = this.$route.query.val ? this.$route.query.val : this.activeName;
        }
      },

      getFlag (params) {
        this.flag = params.flag;
      },
      handleClick(tab, event) {

      },
      musicFn (params) {
        this.activeName = params.value;
      },
      playListFn (params) {
        this.playListDetailId = params.id;
        this.flag = !params.isShowPlayListDetail;
        this.$nextTick(() => {
          this.$refs.playListDetail.getPlayListDetailFn(this.playListDetailId);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
.container {
  .content {
    min-width: calc(100% - 100px);
    height: calc(100% - 120px);
    /deep/ .el-tabs__content {
    /*overflow: hidden;*/
    position: relative;
    height: 500px;
    overflow: auto;
    }
  }
    .playListDetail {
      margin: 10px;
      overflow: auto;
      height: calc(100vh - 160px);
    }
}
</style>
