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
      <!--电台个性化推荐开始-->
      <div class="title">
        电台个性化推荐 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in personalizeList" :key="index">
          <div class="info-img-user">
            <img :src="item.picUrl" alt="加载中……">
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!--  电台个性化推荐结束-->
      <!--  创作翻唱开始-->
      <div class="title">
        创作翻唱 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in creativeCoverList" :key="index">
          <div class="info-img-user">
            <img :src="item.picUrl" alt="加载中……">
            <!--            <div class="img" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}"></div>-->
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!-- 创作翻唱结束-->
      <!-- 声之剧场开始-->
      <div class="title">
        声之剧场 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in theatreList" :key="index">
          <div class="info-img-user">
            <div class="pay">
              付费精品
            </div>
            <img :src="item.picUrl" alt="加载中……">
            <!--            <div class="img" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}"></div>-->
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!-- 声之剧场结束-->
      <div class="title">
        音乐故事 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in storyList" :key="index">
          <div class="info-img-user">
            <img :src="item.picUrl" alt="加载中……">
            <!--            <div class="img" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}"></div>-->
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!-- 情感调频开始-->
      <div class="title">
        情感调频 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in emotionList" :key="index">
          <div class="info-img-user">
            <img :src="item.picUrl" alt="加载中……">
            <!--            <div class="img" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}"></div>-->
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!-- 情感调频结束-->
      <!-- 声音恋人开始-->
      <div class="title">
        声音恋人 <i class="el-icon-arrow-right"></i>
      </div>
      <div class="content">
        <div class="info" v-for="(item,index) in voiceLoverList" :key="index">
          <div class="info-img-user">
            <img :src="item.picUrl" alt="加载中……">
            <!--            <div class="img" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}"></div>-->
            <div class="user">{{item.name}}</div>
          </div>
          <div class="rcmdText">{{item.rcmdtext}}</div>
        </div>
      </div>
      <!-- 声音恋人结束-->
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
        creativeCoverList: [], // 创作翻唱
        theatreList: [], // 声之剧场
        storyList: [], // 音乐故事
        emotionList: [], // 情感调频
        voiceLoverList: [] // 声音恋人
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
          this.getCreativeCoverListFn();
          this.getTheatreListFn();
          this.getStoryListFn();
          this.getEmotionListFn();
          this.getVoiceLoverListFn();
        },
        // 电台个性化推荐
        async getPersonalizeRecommendFn () {
          const { data } = await this.$axios.get('/dj/personalize/recommend');
          if (data.code === 200) {
              this.personalizeList = data.data;
          }
        },
        // 创作翻唱
        async getCreativeCoverListFn () {
            const { data } = await this.$axios.get('/dj/radio/hot', {
              params: {
                // 获取的数据量
                limit: 2,
                offset: 0,
                cateId: 2001
              },
            });
            if (data.code === 200) {
                this.creativeCoverList = data.djRadios;
            }
        },
        // 情感调频
        async getEmotionListFn () {
          const { data } = await this.$axios.get('/dj/radio/hot?cateId=3');
          if (data.code === 200) {
              // this.emotionList = data.djRadios;
            for (const key of data.djRadios) {
              this.emotionList.push(key);
              if (this.emotionList.length >= 6) {
                break;
              }
            }
          }
        },
        // 声音恋人
        async getVoiceLoverListFn () {
            const { data } = await this.$axios.get('/dj/radio/hot?cateId=3001');
            if (data.code === 200) {
                // this.voiceLoverList = data.djRadios;
              for (const key of data.djRadios) {
                this.voiceLoverList.push(key);
                if (this.voiceLoverList.length >= 6) {
                  break;
                }
              }
            }
        },
        // 声之剧场
        async getTheatreListFn () {
          const { data } = await this.$axios.get('/dj/radio/hot', {
            params: {
              // 获取的数据量
              limit: 30,
              offset: 0,
              cateId: 10001
            },
        });
          if (data.code === 200) {
            // this.theatreList = data.djRadios;
            for (const key of data.djRadios) {
              this.theatreList.push(key);
              if (this.theatreList.length >= 6) {
                break;
              }
            }
          }
        },
        // 音乐故事
        async getStoryListFn () {
          const { data } = await this.$axios.get('/dj/radio/hot?cateId=2');
            // if (data.code === 200) {
            //     this.storyList = data.djRadios;
            // }
          if (data.code === 200) {
            // this.theatreList = data.djRadios;
            for (const key of data.djRadios) {
              this.storyList.push(key);
              if (this.storyList.length >= 6) {
                break;
              }
            }
          }
        },
    }
  }
</script>

<style lang="less" scoped>
.container {

  .carousel {
    margin: 0 60px;
    position: relative;
    img {
      border-radius: 10px;
    }
    span {
      background-color: #ec4141;
      width: 80px;
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
      margin-bottom: 4px;
    }
  }
  .middle {
    margin: 0 60px;
    /*width: 100%;*/
    height: 150px;
    background-color: #ec4141;
  }
  .bottom {
    margin: 0 50px;
    .title {
      margin: 10px 0;
      height: 30px;
      padding: 0 10px;
    }
    .content {
        height: 250px;
        .info {
          float: left;
          width: 160px;
          height: 200px;
          position: relative;
          padding: 10px 12px 10px 10px;
          .info-img-user {
            position: relative;
            height: 160px;
            background-color: #b1b1b1;
            cursor: pointer;
            border-radius: 10px;
            img {
              /*z-index: 20;*/
              width: 160px;
              height: 160px;
              opacity: 0.6;
              border-radius: 10px;
              filter: alpha(opacity=60);
            }
            .user {
              position: absolute;
              left: 0;
              bottom: 0;
              margin: 0 0 5px 5px;
              color: #ffffff;
              width: 100%;
              overflow:hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow:ellipsis;
              font-size: 14px;
            }
            .pay {
              position: absolute;
              top: 0;
              left: 0;
              background-color: #ec4141;
              z-index: 10;
              border-radius: 10px 0 10px 0;
              font-size: 12px;
              padding: 3px;
              width: 50px;
              color: white;
              /*padding: 5px;*/
            }
          }
          .rcmdText {
            cursor: pointer;
            /*display: none;*/
            /*word-break: break-word;*/
            word-wrap: break-word;
            margin-top: 10px;
            font-size: 14px;
          }
        }
    }
  }
}
</style>
