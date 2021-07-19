<template>
  <div>
    <div>找到{{count}}{{label}}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <play-table-detail :tableData="tableData"></play-table-detail>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="second">歌手</el-tab-pane>
      <el-tab-pane label="专辑" name="third">专辑</el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="歌词" name="fifth">歌词</el-tab-pane>
      <el-tab-pane label="播客" name="sixth">播客</el-tab-pane>
      <el-tab-pane label="用户" name="seventh">用户</el-tab-pane>
      <el-tab-pane label="视频" name="eighth">视频</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import playTableDetail from '@/components/playTableDetail'
  export default {
    name: "index",
    components: {
      playTableDetail
    },
    computed: {
      ...mapState,
      songCount () {
        return this.$store.state.songCount;
      },
    },
    watch: {
      // songCount: {
      //   handler (val) {
      //     this.count = val
      //   }
      // },
      $route: {
        handler (val) {
          this.activeName = 'first';
          this.getList('first',1);
        }
      },
    },
    data() {
      return {
        activeName: 'first',
        count: 0,
        value: '',
        label: '首单曲',
        tableData: []
      };
    },
    mounted () {
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.getList('first',1);
        } else if (tab.name === 'second') {
          this.getList('second',100);
        } else if (tab.name === 'third') {
          this.getList('third',10);
        } else if (tab.name === 'fourth') {
          this.getList('fourth',1000);
        } else if (tab.name === 'fifth') {
          this.getList('fifth',1006);
        } else if (tab.name === 'sixth') {
          this.getList('sixth',1009);
        } else if (tab.name === 'seventh') {
          this.getList('seventh',1002);
        } else {
          this.getList('eighth',1014);
        }
      },
      async getList (type, val) {
        const { data } = await this.$axios.get('/cloudsearch', {
          params: {
            // 获取的数据量
            keywords: this.$route.query.value,
            type: val
          },
        });
        if (data.code === 200) {
          if (type === 'first') {
            this.count = data.result.songCount;
            this.tableData = data.result.songs;
            this.label = '首单曲';
          } else if (type === 'second') {
            this.count = data.result.artistCount;
            this.label = '位歌手';
          } else if (type === 'third') {
            this.count = data.result.albumCount;
            this.label = '张专辑';
          } else if (type === 'fourth') {
            this.count = data.result.playlistCount;
            this.label = '个歌单';
          } else if (type === 'fifth') {
            this.count = data.result.songCount;
            this.label = '首歌词';
          } else if (type === 'sixth') {
            this.count = data.result.djRadiosCount;
            this.label = '个播客';
          } else if (type === 'seventh') {
            this.count = data.result.userprofileCount;
            this.label = '位用户';
          } else {
            this.count = data.result.videoCount;
            this.label = '个视频';
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
 /deep/ .el-tabs__content {
    overflow: auto;
    height: calc(100vh - 230px);
  }
</style>
