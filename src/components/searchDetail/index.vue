<template>
  <div>
    <div>找到{{count}}首单曲</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <play-table-detail></play-table-detail>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="second">歌手</el-tab-pane>
      <el-tab-pane label="专辑" name="third">专辑</el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="歌词" name="fifth">歌词</el-tab-pane>
      <el-tab-pane label="播客" name="sixth">播客</el-tab-pane>
      <el-tab-pane label="用户" name="seventh">用户</el-tab-pane>
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
      songCount: {
        handler (val) {
          this.count = val
        }
      },
      $route: {
        handler (val) {
          console.log('val', val);
          this.value = val.query.value;
          this.activeName = 'first';
        }
      },
    },
    data() {
      return {
        activeName: 'first',
        count: 0,
        value: ''
      };
    },
    mounted () {
      // this.value = this.$route.query.value
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name === 'second') {
          this.getList(100)
        }
      },
      async getList (val) {
        const { data } = await this.$axios.get('/cloudsearch', {
          params: {
            // 获取的数据量
            keywords: this.value,
            type: val
          },
        });
      }
    }
  }
</script>

<style scoped>

</style>
