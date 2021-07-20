<template>
  <div>
    <div>找到{{count}}{{label}}</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="first">
        <play-table-detail :pageNum="pageNum" :pageSize="pageSize" :tableData="tableData"></play-table-detail>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="second">
        <el-table
            :data="artists"
            :show-header="false"
            stripe
            style="width: 100%">
          <el-table-column
              type="index"
              :index="indexMethod"
              min-width="10%">
          </el-table-column>
          <el-table-column
              prop="img1v1Url"
              label="歌手"
              show-overflow-tooltip
              min-width="5%">
            <template slot-scope="scope">
              <div>
                <img width="60" height="60" :src="scope.row.img1v1Url" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="歌手"
              show-overflow-tooltip
              min-width="50%">
          </el-table-column>
          <el-table-column
              prop="score"
              label="热度"
              align="right"
              show-overflow-tooltip
              min-width="20%">
            <template slot-scope="scope">
<!--              <span>热度：{{scope.row.score}}</span>-->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="third">
        <el-table
            :data="albums"
            :show-header="false"
            stripe
            style="width: 100%">
          <el-table-column
              type="index"
              :index="indexMethod"
              min-width="10%">
          </el-table-column>
          <el-table-column
              prop="img1v1Url"
              label="歌手"
              show-overflow-tooltip
              min-width="5%">
            <template slot-scope="scope">
              <div>
                <img width="60" height="60" :src="scope.row.picUrl" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="专辑"
              show-overflow-tooltip
              min-width="30%">
          </el-table-column>
          <el-table-column
              prop=""
              label="歌手"
              show-overflow-tooltip
              min-width="50%">
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.artists" :key="index">{{item.name}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="歌词" name="fifth">歌词</el-tab-pane>
      <el-tab-pane label="播客" name="sixth">播客</el-tab-pane>
      <el-tab-pane label="用户" name="seventh">用户</el-tab-pane>
      <el-tab-pane label="视频" name="eighth">视频</el-tab-pane>
    </el-tabs>
    <div class="pagination">
      <el-pagination
          background
          :page-size="pageSize"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import playTableDetail from '@/components/playTableDetail'
  // import artistDetail from '@/components/cloudMusicRanking/detail'
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
        total: 0, // 总数
        pageSize: 30,
        pageNum: 1,
        activeName: 'first',
        count: 0,
        val: 1,
        value: this.$route.query.value,
        label: '首单曲',
        tableData: [],
        artists: [],
        albums: []
      };
    },
    mounted () {
      this.getList('first',1);
    },
    methods: {
      // 自定义索引
      indexMethod(index) {
        if (this.pageNum >= 1) {
          return (this.pageNum - 1 )* this.pageSize + index + 1;
        } else {
          return this.pageNum * this.pageSize + index + 1;
        }
      },
      handleClick(tab, event) {
        this.pageNum = 1;
        this.total = 0;
        this.pageSize = 30;
        if (tab.name === 'first') {
          this.getList('first',1);
          this.val = 1;
        } else if (tab.name === 'second') {
          this.getList('second',100);
          this.val = 100;
        } else if (tab.name === 'third') {
          this.getList('third',10);
          this.val = 10;
        } else if (tab.name === 'fourth') {
          this.getList('fourth',1000);
          this.val = 1000;
        } else if (tab.name === 'fifth') {
          this.getList('fifth',1006);
          this.val = 1006;
        } else if (tab.name === 'sixth') {
          this.getList('sixth',1009);
          this.val = 1009;
        } else if (tab.name === 'seventh') {
          this.getList('seventh',1002);
          this.val = 1002;
        } else {
          this.getList('eighth',1014);
          this.val = 1014;
        }
      },
      async getList (type, val) {
        const { data } = await this.$axios.get('/cloudsearch', {
          params: {
            // 获取的数据量
            keywords: this.$route.query.value,
            limit: 30,
            type: val,
            offset: (this.pageNum - 1) * 30
          },
        });
        if (data.code === 200) {
          if (type === 'first') {
            this.count = data.result.songCount;
            this.tableData = data.result.songs;
            this.label = '首单曲';
          } else if (type === 'second') {
            this.count = data.result.artistCount;
            this.artists = data.result.artists;
            this.label = '位歌手';
          } else if (type === 'third') {
            this.count = data.result.albumCount;
            this.albums = data.result.albums;
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
          this.total = this.count;
        }
      },
      /**
       * @Description 切换页
       * @author wangkangzhang
       * @date 2021/6/3
       */
      handleCurrentChange (val) {
       this.pageNum = val;
        this.getList(this.activeName,this.val);
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2021/6/3
       */
      handleSizeChange (val) {
        console.log('val', val);
      },
    }
  }
</script>

<style lang="less" scoped>
 /deep/ .el-tabs__content {
    overflow: auto;
    height: calc(100vh - 300px);
  }
  .pagination {
    margin-top: 15px;
  }
</style>
