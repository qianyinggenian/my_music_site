<template>
  <div>
    <el-button @click="resetDateFilter" v-if="isShowFilter">{{showFilterLabel}}</el-button>
    <el-button @click="clearFilter" v-if="isShowClearFilter">{{showClearFilterLabel}}</el-button>
    <div ref="tableTitle" class="table-title" v-show="gridEntityInfo.title" >{{gridEntityInfo.title}}</div>
    <el-table
      ref="commonTable"
      row-key="id"
      style="width: 100%"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :height="height || tableHeight"
      :max-height="maxHeight"
      :lazy="lazy"
      :load="load"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="getSummaries"
      :span-method="spanMethod"
      :tooltip-effect="tooltipEffect"
      :current-row-key="currentRowKey"
      :row-class-name="tableRowClassName"
      :cell-style="rowClass"
      cell-class-name="cell-class"
      :row-style="rowStyle"
      :header-cell-style="headerCellStyle"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChangeFn"
      @select="handleSelect"
      @select-all="handleSelectAllFn"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
      >
      <!-- 是否显示多选框-->
      <el-table-column
          v-if="gridEntityInfo.showCheckbox !== false"
          type="selection"
          :fixed="isCheckboxFixed"
          :selectable="hasCheckBox"
          reserve-selection
          class-name="choose-input-table-selection"
          :show-overflow-tooltip="false"
          align="center"
          header-align="center"
          width="50">
      </el-table-column>
      <!-- 是否显示单选框-->
      <el-table-column
          v-if="gridEntityInfo.showRadio"
          width="50">
        <template slot-scope="scope">
          <input type="radio" ref="radio" style="width:15px; height:15px;" @click="handleChooseItem($event, scope.row)">
        </template>
      </el-table-column>
      <!-- 是否显示序号-->
      <el-table-column
          v-if="gridEntityInfo.showRowNumbers === false ? false : true"
          type="index"
          :fixed="isIndexFixed"
          :index="indexMethod"
          label="序号"
          class-name="choose-input-table-index"
          :show-overflow-tooltip="false"
          header-align="center"
          align="center"
          width="50">
      </el-table-column>
      <template v-for="item in listColumnInfo">
        <!-- 是否有插槽-->
        <el-table-column
            :prop="item.prop || item.name"
            :label="item.label"
            :sortable="item.sortable || sortable"
            :fixed="item.fixed"
            :sort-method="sortMethod"
            :sort-by="sortBy"
            :filters="item.filters"
            :align="item.align || align"
            :show-overflow-tooltip="showOverflowTooltip"
            :width="item.width || width"
            v-if="item.slot"
            :render-header="item.renderHeader || renderHeader"
            :key="item.id"
        >
          <template slot-scope="scope">
          <slot
              :name="item.slot"
              :column="item"
              :row="scope.row"
              :index="scope.$index"
          />
        </template>
        </el-table-column>
        <tableColumn
            v-else
            :key="item.id"
            :col="item"
        >
        </tableColumn>
      </template>
      <!-- 操作列 -->
      <el-table-column label="操作" :width="gridEntityInfo.operateColumnWidth" v-if="gridEntityInfo.showOperateColumn !== false">
        <template slot-scope="scope">
          <template v-for="item in (Array.isArray(tableBtns) ? tableBtns : tableBtns[scope.row.typeCode])">
            <!--  显示图标按钮-->
            <template v-if="isShowIconBtns">
              <i :key="item.id"
                 v-if="scope.row.showTableBtns.includes(item.displayValue)"
                 class="operate-icon"
                 :class="item.icon"
                 :title="item.displayName"
                 style="cursor: pointer"
                 :style="{color: item.color}"
                 @click="handleClick(scope.row, scope.$index, item, tableData)"
              >
               <span v-if="isShowIconTxts">{{item.displayName}}</span>
              </i>
            </template>
            <!--  显示文字按钮-->
            <template v-if="isShowTxtBtns">
            <span
                v-if="scope.row.showTableBtns.includes(item.displayValue)"
                class="operate-Txt"
                :title="item.displayName"
                style="cursor: pointer"
                :style="{color: item.color}"
                @click="handleClick(scope.row, scope.$index, item, tableData)">
              {{item.displayName}}
            </span>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation-wrapper" v-if="showBottomAction" ref="pagenationWrapper">
      <el-pagination
          :small="paginationSmall"
          :pager-count="pagerCount"
          :disabled="paginationDisabled"
          :background="paginationBackground"
          :next-text="nextText"
          :prev-text="prevText"
          :popper-class="popperClass"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-sizes="[20, 50, 100, 200, 500 ,1000, 10000]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="200">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import tableColumn from './table-column/index.vue'
export default {
  name: "commonTableIndex",
  components: {
    tableColumn
  },
  data () {
    return {
      pageNum: 1,
      /* 每页显示多少条 */
      pageSize:20,
      selectedGroup: []
    }
  },
  props: {
    /* 是否使用小型分页样式 */
    paginationSmall: {
      type: Boolean,
      default: false
    },
    /* 是否为分页按钮添加背景色 */
    paginationBackground: {
      type: Boolean,
      default: true
    },
    /* 页码按钮的数量，当总页数超过该值时会折叠 */
    pagerCount: {
      type: Number,
      default: 7
    },
    /* 是否禁用分页按钮 */
    paginationDisabled: {
      type: Boolean,
      default: false
    },
    /* 替代图标显示的上一页文字 */
    prevText: {
      type: String,
      default: ''
    },
    /* 替代图标显示的下一页文字 */
    nextText: {
      type: String,
      default: ''
    },
    /* 每页显示个数选择器的下拉框类名 */
    popperClass: {
      type: String,
      default: ''
    },
    pages: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 20
        };
      }
    },
    /* 能点击的列 */
    canClickRow: {
      type: Array
    },
    /* 表格列属性 */
    listColumnInfo: {
      type: Array,
      default: () => ([])
    },
    /* 表格数据 */
    tableData: {
      type: Array,
      default: () => ([])
    },
    /* 表格操作按钮 */
    tableBtns: {
      type: Array
    },
    /* 是否显示斑马线 */
    stripe: {
      type: Boolean,
      default: false
    },
    /* 表格列宽度 */
    width: {
      type: Number,
      default: 150
    },
    /* 对齐方式 */
    align: {
      type: String,
      default: 'center'
    },
    /* 表格高度 */
    height: {
      type: [String,Number],
      default: 400
    },
    /* 是否显示边框 */
    border: {
      type: Boolean,
      default: true
    },
    /* 表格最大高度 */
    maxHeight: {
      type: [String,Number]
    },
    /* 是否懒加载子节点数据 */
    lazy: {
      type: Boolean,
      default:true
    },
    /* 加载子节点数据的函数 */
    load: {
      type: Function
    },
    /* Table 的尺寸 */
    size: {
      type: String,
      default: 'mall'
    },
    /* 排序 */
    sortable: {
      type: [Boolean,String],
      default: false
    },
    /* 表尾合计 */
    showSummary: {
      type: Boolean,
      default: false
    },
    /* 表尾统计文案 */
    sumText: {
      type: String,
      default: '合计'
    },
    /* 自定义合计规则 */
    getSummaries: {
      type: Function
    },
    /* 自定义排序规则 */
    sortMethod: {
      type: Function
    },
    /* 指定数据按照哪个属性进行排序 */
    sortBy: {
      type: [Array,String,Function]
    },
    // // 用于格式化指定列的值
    // formatter: {
    //   type: Function
    // }
    /* 清除筛选器 */
    isShowFilter: {
      type: Boolean,
      default: false
    },
    /* 清除所有的筛选器 */
    isShowClearFilter: {
      type: Boolean,
      default: false
    },
    /* 筛选器文案 */
    showFilterLabel: {
      type: String,
      default: '清除日期过滤器'
    },
    /* 筛选器文案 */
    showClearFilterLabel: {
      type: String,
      default: '清除所有过滤器'
    },
    /* 表格属性 */
    gridEntityInfo: {
      type: Object,
      default: () => {}
    },
    /* 序号列是否锁定 */
    isIndexFixed: {
      type: Boolean,
      default: false
    },
    /* 复选框列是否锁定 */
    isCheckboxFixed: {
      type: Boolean,
      default: false
    },
    /* 鼠标悬停提示 */
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    /* 表头样式自定义 */
    renderHeader: {
      type: Function
    },
    /* 表格行、列合并 */
    spanMethod: {
      type: Function
    },
    /* tooltip effect 属性 */
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    /* 列的宽度是否自撑开 */
    fit: {
      type: Boolean,
      default: true
    },
    /* 是否显示表头 */
    showHeader: {
      type: Boolean,
      default: true
    },
    /* 是否要高亮当前行 */
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    /* 当前行的 key，只写属性 */
    currentRowKey: {
      type: [String,Number]
    },
    /* 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 */
    tableRowClassName: {
      type: [Function,String]
    },
    /* 行的 style 的回调方法 */
    rowStyle: {
      type:[Function,Object]
    },
    /* 表头单元格的 style 的回调方法 */
    headerCellStyle: {
      type: [Function,Object]
    },
    /* 图标按钮 */
    isShowIconBtns: {
      type: Boolean,
      default: true
    },
    /* 按钮文字 */
    isShowIconTxts: {
      type: Boolean,
      default: true
    },
    /* 文字按钮 */
    isShowTxtBtns: {
      type: Boolean,
      default: false
    },
    /* 是否显示分页 */
    showBottomAction: {
      type: Boolean,
      default: true
    },
    showBottomPagination: {
      type: Boolean,
      default: true
    },
    /* 总共多少条数据  */
    total: {
      type: [Number, String]
    }
  },
  watch: {
    pages: {
      handler (newval) {
        if (JSON.stringify(this.pages) !== '{}') {
          this.pageNum = this.pages.pageNum || 1;
          this.pageSize = this.pages.pageSize || 20;
        }
      },
      deep: true,
      immediate: true
    }
    },
  created() {

  },
  methods: {
    // renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
    //   return h(
    //     'div',
    //     [
    //       h('span', column.label),
    //       h('i', {
    //         class:'el-icon-eleme',
    //         style:'color:#409eff;margin-left:5px;'
    //       })
    //     ],
    //   );
    // },
    /**
     * @Description 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleSelect (selection, row) {
      this.$emit('select', selection, row);
    },
    /**
     * @Description 当用户手动勾选全选 Checkbox 时触发的事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleSelectAllFn (selection) {
      this.$emit('selectionAll', selection);
    },
    /**
     * @Description 当选择项发生变化时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleSelectionChange (selection) {
      this.$emit('selectionChange', selection);
    },
    /**
     * @Description 当单元格 hover 进入时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleCellMouseEnter (row, column, cell, event) {
      const params = {
        row: row,
        column: column,
        cell: cell,
        event: event
      };
      this.$emit('cellMouseEnter', params);
    },
    /**
     * @Description 当单元格 hover 退出时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleCellMouseLeave (row, column, cell, event) {
      const params = {
        row: row,
        column: column,
        cell: cell,
        event: event
      };
      this.$emit('cellMouseLeave', params);
    },
    /**
     * @Description 当某个单元格被点击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleCellClick (row, column, cell, event) {
      const params = {
        row: row,
        column: column,
        cell: cell,
        event: event
      };
      this.$emit('cellClick', params);
    },
    /**
     * @Description 当某个单元格被双击击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleCellDblclick (row, column, cell, event) {
      const params = {
        row: row,
        column: column,
        cell: cell,
        event: event
      };
      this.$emit('cellDblclick', params);
    },
    /**
     * @Description 当某一行被点击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleRowClick (row, column, event) {
      const params = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('rowClick', params);
    },
    /**
     * @Description 当某一行被鼠标右键点击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleRowContextmenu (row, column, event) {
      const params = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('rowContextmenu', params);
    },
    /**
     * @Description 当某一行被双击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleRowDblclick (row, column, event) {
      const params = {
        row: row,
        column: column,
        event: event
      };
      this.$emit('rowDblclick', params);
    },
    /**
     * @Description 当某一列的表头被点击时会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleHeaderClick (column, event) {
      const params = {
        column: column,
        event: event
      };
      this.$emit('headerClick', params);
    },
    /**
     * @Description 当某一列的表头被鼠标右键点击时触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleHeaderContextmenu (column, event) {
      const params = {
        column: column,
        event: event
      };
      this.$emit('headerClick', params);
    },
    /**
     * @Description 当表格的排序条件发生变化的时候会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleSortChange ({ column, prop, order }) {
      const params = {
        column: column,
        prop: prop,
        order: order
      };
      let direction = '';
      if (order === 'ascending') {
        direction = 'ASC';
      } else if (order === 'descending') {
        direction = 'DESC';
      } else {
        direction = '';
      }
      this.$emit('sortChange', params);
    },
    /**
     * @Description 当表格的筛选条件发生变化的时候会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleFilterChange (filters) {
      this.$emit('filterChange', filters);
    },
    /**
     * @Description 当表格的当前行发生变化的时候会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleCurrentChangeFn (currentRow, oldCurrentRow) {
      const params = {
        currentRow: currentRow,
        oldCurrentRow: oldCurrentRow
      };
      this.$emit('currentChange', params);
    },
    /**
     * @Description 当拖动表头改变了列的宽度的时候会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleHeaderDragend (newWidth, oldWidth, column, event) {
      const params = {
        newWidth: newWidth,
        oldWidth: oldWidth,
        column: column,
        event: event
      };
      this.$emit('headerDragend', params);
    },
    /**
     * @Description 当用户对某一行展开或者关闭的时候会触发该事件
     * @author wangkangzhang
     * @date 2021/4/2
    */
    handleExpandChange (row,expandedRows) {
      const params = {
        row: row,
        expandedRows: expandedRows
      };
      this.$emit('expandChange', params);
    },
    /**
     * 序号排列方法
     */
    indexMethod (index) {
      return index + (this.pageNum - 1) * this.pageSize + 1;
    },
    /**
     * @Description 判断是否需要复选框
     * @author wangkangzhang
     * @date 2021/4/1
    */
    hasCheckBox (row, index) {
      return !row.noCheck;
    },
    /**
     * @Description
     * @author wangkangzhang
     * @date 2021/4/1
    */
    handleChooseItem (e, row) {
      e.target.checked = false;
      console.log('row', row);
      this.$emit('choose-item', row);
    },
    /**
     * @Description 点击表格按钮触发
     * @author wangkangzhang
     * @date 2021/4/9
    */
    handleClick (row, index, item, tableData) {
      this.$emit(item.displayValue, { row, index, item, tableData });
    },
    rowClass ({ row, column, rowIndex, columnIndex }) {
      let style = '';
      if (this.selectedGroup.map(item => item.id).includes(row.id)) {
        style = { 'background-color': '#FFECB1!important' };
      }
      if (this.canClickRow && this.canClickRow.includes(column.property)) {
        style = Object.assign(style, { cursor: 'pointer' });
      }
      return style;
    },
    /**
     * @Description 切换页触发
     * @author wangkangzhang
     * @date 2021/4/9
    */
    handleCurrentChange (val) {
      this.pageNum = val;
      this.$emit('current-change', val);
    },
    /**
     * @description 切换每页显示多少条时触发
     * @author wangkangzhang
     * @date 2021/4/9
     */
    handleSizeChange (val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.$emit('page-size-change', val);
    },
  }
}
</script>

<style lang="less" scoped>
  @pagenation-bg-color: white;
  .table-title {
    width: 100%;
    height: 21px;
    line-height: 21px;
    padding: 5px 0;
    background-color: #56A2E8;
    color: #fff;
    text-align: center;
  }

 /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
   background-color: #FFECB1;
 }
 /deep/ .cell {
   text-align: center;
   line-height: 18px;
   .operate-icon {
     display: inline-block;
     margin-right: 10px;
     font-size: 16px;
     span {
       padding-left: 5px;
     }
   }
   .operate-Txt {
     display: inline-block;
     margin-right: 10px;
     font-size: 16px;
   }
 }
 // 分页样式
 .pagenation-wrapper {
   width: 100%;
   height: 38px;
   position: relative;
   bottom: 0;
   overflow: hidden;
   border: 1px solid #ddd;
   border-bottom: 0;
   padding: 5px 15px 5px 0;
   box-sizing: border-box;
   display: flex;
   justify-content: flex-end;
   background: @pagenation-bg-color;

   .search-input {
     width: 176px;
     height: 28px;
     padding-left: 5px;
     display: inline-block;
     margin-top: 6px;
     /deep/ input {
       height: 28px;
       line-height: 28px;
     }
   }

   .el-icon-search {
     color: #217FBC;
     cursor: pointer;
   }

   .pagenation {
     float: right;
     margin: 3px 5px 0 0;
   }
 }

</style>
