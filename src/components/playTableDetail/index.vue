<template>
  <div>
    <el-table
        :data="tableData || arr"
        style="width: 100%"
        size="mini"
        :row-class-name="tableRowClassName"
        @cell-dblclick="cellDblclick"
    >
      <el-table-column
          type="index"
          :index="indexMethod"
          width="50">
      </el-table-column>
      <el-table-column
          prop="icon"
          label=""
          width="80"
      >
        <template slot-scope="scope">
          <i class="icon iconfont icon-shoucang Icon"></i>
          <i class="icon iconfont icon-xiazai Icon"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="音乐标题"
          show-overflow-tooltip
          sortable>
      </el-table-column>
      <el-table-column
          prop="singer"
          label="歌手"
          width="200px"
          show-overflow-tooltip
          sortable>
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.ar" :key="index">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="album"
          label="专辑"
          sortable
          show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{scope.row.al.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="duration"
          label="时长"
          sortable
          width="80"
      >
        <template slot-scope="scope">
          <span>{{duration(scope.row.dt)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { formatDuration } from '@/utils/util'
  export default {
    name: "index",
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      pageNum: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 30
      }
    },
    computed: {
      arr () {
        return this.$store.state.tableData;
      }
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
      duration (item) {
        return formatDuration(item)
      },
      // 表格样式
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else  {
          return '';
        }
      },
      // 双击播放
      cellDblclick (row, column, cell, event) {
        this.$store.dispatch('getSongUrlFn', row.id);
        this.$store.dispatch('getSongDetailFn', row.id);
        this.$message({
          message: '已添加到播放列表',
          type: 'success'
        });
      },
    }
  }
</script>

<style lang="less" scoped>
 i {
   padding: 0 5px;
 }
</style>
