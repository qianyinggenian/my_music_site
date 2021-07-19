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
          width="40">
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
      }
    },
    computed: {
      arr () {
        return this.$store.state.tableData;
      }
    },
    methods: {
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
