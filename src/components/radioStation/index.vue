<template>
  <div class="content">
    <div class="carousel">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div class="carousel">
            <img :src=item.pic alt="" height="100%" width="100%">
            <span>{{item.typeTitle}}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
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
        banners: [], // 轮播图信息
      };
    },
    mounted() {
      this.getBanner();
      this.hotFn();
    },
    methods: {
      /**
       * @Description 电台轮播图
       * @author wangkangzhang
       * @date 2021/6/3
      */
      async getBanner () {
        const { data: data } = await this.$axios.get('/dj/banner');
        if (data.code === 200) {
          this.banners = data.data;
          console.log('this.banners', this.banners);
        }
      },
      /**
       * @Description 电台分类
       * @author wangkangzhang
       * @date 2021/6/3
      */
      async hotFn () {
        const { data: data } = await this.$axios.get('/dj/catelist');
      }
    }
  }
</script>

<style lang="less" scoped>
.content {
  margin: 0 60px;
  .carousel {
    img {
      border-radius: 10px;
    }
    span {
      background-color: #ec4141;
      width: 100px;
      height: 20px;
      text-align: center;
      position: absolute;
      bottom: 0;
      /*top: 0;*/
      right: 0;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
      color: #ffffff;
      padding: 2px;
    }
  }
}
</style>
