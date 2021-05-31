<template>
  <div class="content">
    <div class="carousel">
      <carousel
        :type="carouselType"
        :carouselHeight="carouselHeight"
      >
      </carousel>
    </div>
    <div>推荐歌单 <i class="el-icon-arrow-right"></i></div>
    <div class="list">
      <div class="listOne" v-for="(item,index) in list" :key="index"  @click="toPlayListDetail(item.id)">
<!--       <img class="listImg" :src="item.picUrl" alt="">-->
        <div class="listImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
          <div class="listTitle">{{item.copywriter}}</div>
          <div class="listPlay">
            <i class="el-icon-caret-right "></i>
          </div>
        </div>
        <div class="">{{item.name}}</div>
      </div>
    </div>
    <div class="sole"></div>
    <div class="latestMusic"></div>
    <div class="MV"></div>
    <div class="radio"></div>
    <div class="listen"></div>
    <div class="read"></div>
  </div>
</template>

<script>
  import carousel from '../carousel';
  export default {
    name: "index",
    components: {
      carousel
    },
    data () {
      return {
        carouselType: 'card',
        carouselHeight: '230px',
        list: [], // 推荐歌单
        banner: [] // 轮播图信息
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /**
       * @Description 获取推荐歌单
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async getList() {
        const { data } = await this.$axios.get('/personalized', {
          params: {
            // 获取的数据量
            limit: 10,
          },
        });
        console.log('data', data);
        if (data.code === 200) {
          this.list = data.result;
        }
      },
      /**
       * @Description 推荐歌单详细信息
       * @author wangkangzhang
       * @date 2021/5/31
      */
      toPlayListDetail (id) {}
    }
  }
</script>

<style lang="less" scoped>
.content {
  padding: 0 30px;
  .carousel {}
  .list {
    /*display: flex;*/
    float: left;
    width: 100%;
    height: 560px;
    .listOne {
      width: 215px;
      float: left;
      position: relative;
      height: 215px;
      padding: 10px 11px 40px 0;
      .listTitle {
        width: 205px;
        background-color: #182d36;
        opacity: 0.5;
        color: #ffffff;
        padding: 5px;
        display: none;
      }
      &:hover .listTitle {
        display: block;
      }
      .listImg {
        width: 215px;
        height: 215px;
        .listPlay {
          display: none;
          position: absolute;
          right: 30px;
          bottom: 50px;
          background-color: white;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 15px;
          i {
            font-size: 18px;
            color: red;
          }
        }
        &:hover .listPlay {
          display: block;
        }
      }
    }
  }
}
</style>
