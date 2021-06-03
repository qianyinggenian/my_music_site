<template>
  <div class="container">
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
      <div class="middle"></div>
      <div class="bottom">
          <div class="title">
              听听 <i class="el-icon-right"></i>
          </div>
          <div class="content">
              <div class="info">
                  <img src="" alt="">
              </div>
          </div>
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
        banners: [], // 轮播图信息，
        personalizeList: [], // 电台个性化推荐,
        djRadios: [], // 创作翻唱
      };
    },
    mounted() {
      this.getBanner();
      this.hotFn();
      this.getInfo();
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
      },
        async getInfo () {
          this.getPersonalizeRecommendFn();
          this.getPersonalizeRecommendFn1();
          this.getPersonalizeRecommendFn2();
          this.getPersonalizeRecommendFn3();
          this.getPersonalizeRecommendFn4();
          this.getPersonalizeRecommendFn5();
        },
        // 电台个性化推荐
        async getPersonalizeRecommendFn () {
          const { data } = await this.$axios.get('/dj/personalize/recommend');
          if (data.code === 200) {
              this.perpersonalizeList = data.data;
          }
        },
        // 创作翻唱
        async getPersonalizeRecommendFn1 () {
            const { data } = await this.$axios.get('/dj/radio/hot?cateId=2001');
            if (data.code === 200) {
                this.djRadios = data.djRadios;
            }
        },
        // 情感调频
        async getPersonalizeRecommendFn2 () {
            const { data5 } = await this.$axios.get('/dj/radio/hot?cateId=3');
            if (data.code === 200) {
                this.djRadios = data.djRadios;
            }
        },
        // 声音恋人
        async getPersonalizeRecommendFn3 () {
            const { data2 } = await this.$axios.get('/dj/radio/hot?cateId=3001');
            if (data.code === 200) {
                this.djRadios = data.djRadios;
            }
        }
        ,
        // 声之剧场
        async getPersonalizeRecommendFn4 () {
            const { data2 } = await this.$axios.get('/dj/radio/hot?cateId=10001');
            if (data.code === 200) {
                this.djRadios = data.djRadios;
            }
        },
        // 音乐故事
        async getPersonalizeRecommendFn5 () {
            const { data5 } = await this.$axios.get('/dj/radio/hot?cateId=2');
            if (data.code === 200) {
                this.djRadios = data.djRadios;
            }
        },
    }
  }
</script>

<style lang="less" scoped>
.container {
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
    .middle {
        width: 100%;
        height: 150px;
        background-color: #ec4141;
    }
    .bottom {
        .title {
            margin: 10px 0;
            height: 30px;
        }
        .content {
            height: 250px;
            .info {
                img {
                    width: 200px;
                    height: 200px;
                }
            }
        }
    }
}
</style>
