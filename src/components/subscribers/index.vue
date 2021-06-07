<template>
  <div class="container">
    <div class="username" v-for="(item,index) in list" :key="index">
        <div>
            <el-avatar :size="100" :src="item.avatarUrl"></el-avatar>
        </div>
        <div class="sex">
          {{item.nickname}}
            <i class="el-icon-male" v-if="item.gender === 1"></i>
            <i class="el-icon-female"  v-if="item.gender === 2"></i>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {

      };
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="less" scoped>
.container {
  /*display: flex;*/
  /*position: relative;*/
  .username {
    display: flex;
    height: 100px;
    width: 30%;
    float: left;
    margin: 10px;
    .sex {
      text-align: center;
      height: 100px;
      line-height: 100px;
      margin-left: 10px;
      .el-icon-male {
        background-color: #c0f3ff;
        border-radius: 8px;
        color: #72c2e4;
      }
      .el-icon-female {
        background-color: #ffcde8;
        color: #ef77aa;
        border-radius: 8px;
      }
    }
  }
}
</style>
