<template>
  <div>
<!--    <commonTable-->

<!--    ></commonTable>-->
    <commonTable
      :tableData="tableData"
      :gridEntityInfo="gridEntityInfo"
      :listColumnInfo="listColumnInfo"
      :tableBtns="tableBtns"
      :isShowIconBtns="true"
      :total="10"
      :pages="pages"
    >
    </commonTable>
  </div>
</template>

<script>
  import tableMix from './tableMix';
  import commonTable from '../commonTable';
  export default {
    name: "index",
    components: {
      commonTable
    },
    mixins: [
      tableMix
    ],
    data () {
      return {
        tableData: [],
        singers: [], // 歌手
        pages: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        tableBtns: [],
        gridEntityInfo: {
          // title: '表格',
          showCheckbox: false,
          showRowNumbers: true,
          showOperateColumn: false,
          operateColumnWidth: '100px'
        },
      };
    },
    methods: {
      async getPlayListDetailFn(id) {
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: id
          },
        });
        if (data.code === 200) {
          this.tableData = data.playlist.tracks;
          this.singers = this.tableData.ar;
          const singer = ''; // 歌手
          const album = ''; // 专辑
          const duration = '';  // 时长
          for (const key of this.tableData) {
            const params = {
              hahahahah: 111
            };
            key.album = key.al.name; // 专辑
            for (const val of key.ar) {
              key.singer = val.name;
            }
          }
          console.log(this.tableData);
        }
      },
    }
  }
</script>

<style scoped>

</style>
