<template>
  <div>
    <div class="top-card" ref="topCard">
      <div class="top" v-for="(item,index) in artist" :key="index">
        <div class="content" v-if="index < 3">
          <div class="singer">
            <div class="name">{{item.name}}</div>
            <div class="hot">热度：{{item.score}}</div>
          </div>
          <div class="cover">
            <img :src="item.img1v1Url" alt="">
          </div>
        </div>
        <div class="num"  v-if="index < 3">{{index + 1}}</div>
      </div>
    </div>
    <div class="table">
      <el-table
          :data="artist"
          :show-header="false"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
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
            <span>热度：{{scope.row.score}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    props: {
      artist: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-card {
    display: flex;
    .top {
      margin: 0 10px;
      width: 33.3%;
      height: 100px;
      border-radius: 5px;
      position: relative;
      .content {
        height: 100px;
        width: 380px;
        display: flex;
        border-radius: 5px;
        background-color: #fafafa;
        position: relative;
        -webkit-clip-path: polygon(100% 0%, 100% 100%, -15% 100%, 12% 0%);
        img {
          width: 100px;
          height: 100px;
          border-radius: 0 5px 5px 0;
          position: absolute;
          right: 0;
        }
        .cover {
          width: 100px;
          height: 100px;
          border-radius: 0 5px 5px 0;
          position: absolute;
          right: 0;
        }
        .singer {
          width: 100px;
          height: 100px;
          /*display: flex;*/
          margin-left: 40px;
          line-height: 70px;
        }
        .name{
          width: 100px;
          height: 30px;
        }
        .hot {
          width: 200px;
          font-size: 14px;
          color: #cacaca;
        }
        &:hover .hot {
          color: #b7b7b8;
        }
      }
      &:hover .content {
        background-color: #e1e2e3;
      }
      .num {
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 24px;
        color: #ec4141;
      }
    }
    &:hover .top {
      background-color: #f0f1f2;
      border-radius: 5px;
    }
  }
  .table {
    height: calc(100vh - 350px);
    overflow: auto;
  }
</style>
