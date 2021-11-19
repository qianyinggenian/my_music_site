<template>
  <div class="container">
    <div class="carousel">
      <carousel
        :type="carouselType"
        :carouselHeight="carouselHeight"
        :imgList="banners"
      >
      </carousel>
    </div>
    <!--    推荐歌单开始-->
    <div @click="songListFn">
      <span class="title">推荐歌单 <i class="el-icon-arrow-right"></i></span></div>
    <div class="list">
      <div class="listOne" v-for="(item,index) in list" :key="index"  @click="playListDetail(item.id)">
<!--       <img class="listImg" :src="item.picUrl" alt="">-->
        <div class="listImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
          <div class="listTitle">{{item.copywriter}}</div>
          <div class="playCount"><i class="el-icon-caret-right "></i>{{item.playCount}}</div>
          <div class="playBtn">
            <i class="el-icon-caret-right "></i>
          </div>
        </div>
        <div class="">{{item.name}}</div>
      </div>
    </div>
    <!--    推荐歌单开始-->
    <div @click="songListFn">
      <span class="title">推荐歌单 <i class="el-icon-arrow-right"></i></span></div>
    <div class="list-container">
      <div class="list-content" v-for="(item,index) in list" :key="index"  @click="playListDetail(item.id)">
        <!--       <img class="listImg" :src="item.picUrl" alt="">-->
        <div class="listImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
          <div class="listTitle">{{item.copywriter}}</div>
          <div class="playCount"><i class="el-icon-caret-right "></i>{{item.playCount}}</div>
          <div class="playBtn">
            <i class="el-icon-caret-right "></i>
          </div>
        </div>
        <div class="">{{item.name}}</div>
      </div>
    </div>
    <!--    推荐歌单结束-->
    <!--    独家放送开始-->
    <div><span class="title">独家放送 <i class="el-icon-arrow-right"></i></span></div>
    <div class="sole">
      <div class="soleList"  v-for="(item,index) in soleList" :key="index"  @click="soleListDetail(item.id)">
        <div class="soleListImg" :style="{background: 'url(' + item.sPicUrl +')', backgroundSize:'contain'}">
          <div class="solePlayBtn">
            <i class="el-icon-caret-right "></i>
          </div>
        </div>
        <div class="soleListTitle">{{item.name}}</div>
      </div>
    </div>
    <!--    独家放送结束-->
    <!--    最新音乐开始-->
    <div><span class="title">最新音乐 <i class="el-icon-arrow-right"></i></span></div>
    <div class="latestMusic">
      <div class="latestMusicList" v-for="(item,index) in newSongList" :key="index"  @click="musicPlayListDetail(item)">
        <div class="musicImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'contain'}">
          <div class="musicPlayBtn">
            <i class="el-icon-caret-right "></i>
          </div>
        </div>
        <div class="musicContent">
          <div class="top">
            {{item.name}}
            <span v-if="item.song.alias.length > 0">
              ({{item.song.alias[0]}})
            </span>
          </div>
          <div class="bottom">
            <div class="author">
              <span v-if="item.song.artists.length > 1">
                <span v-for="(val,valIndex) in item.song.artists" :key="valIndex">
                  {{val.name}}/
                </span>
              </span>
              <span v-else>{{item.song.artists[0].name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    最新音乐结束-->
    <!--    推荐MV 开始-->
    <div><span class="title">推荐MV <i class="el-icon-arrow-right"></i></span></div>
    <div class="MV">
      <div class="MVList"  v-for="(item,index) in mvList" :key="index"  @click="MVPlayListDetail(item.id)">
        <div class="MVImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}">
          <div class="copywriter">{{item.copywriter}}</div>
          <div class="btn">
            <i class="el-icon-caret-right "></i>{{item.playCount}}
          </div>
        </div>
        <div class="title">{{item.name}}</div>
        <div class="name">{{item.artistName}}</div>
      </div>
    </div>
    <!--    推荐MV 结束-->
    <!--    主播电台 开始-->
    <div><span class="title">主播电台 <i class="el-icon-arrow-right"></i></span></div>
    <div class="radio">
      <div class="radioList" v-for="(item,index) in radioList" :key="index"  @click="MVPlayListDetail(item.id)">
        <div class="bgImg" :style="{background: 'url(' + item.picUrl +')', backgroundSize:'cover'}">
<!--          <div class="">{{item.copywriter}}</div>-->
        </div>
        <div class="title">{{item.name}}</div>
      </div>
    </div>
    <!--    主播电台 结束-->
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
        banners: [], // 轮播图信息
        soleList: [], // 独家放送信息
        newSongList: [], // 最新音乐
        mvList: [], // MV 信息
        radioList: [], // 主播电台信息
        playList: [] // 歌单详情
      };
    },
    mounted() {
      this.getListFn();
    },
    methods: {
      getListFn () {
        this.getList();
        this.getBanner();
        this.getSoleList();
        this.getNewSongList();
        this.getMvList();
        this.getRadioList();
      },
      songListFn () {
        this.$router.push(`/mainContent?type=music&val=second`);
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async getBanner () {
        const { data: data } = await this.$axios.get('/banner');
        if (data.code === 200) {
          this.banners = data.banners;
        }
      },
      /**
       * @Description 获取推荐歌单
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async getList () {
        const { data } = await this.$axios.get('/personalized', {
          params: {
            // 获取的数据量
            limit: 10,
          },
        });
        if (data.code === 200) {
          this.list = data.result;
        }
      },
      // 获取每日推荐歌单
      async getRecommendResource () {
        const { data } = await this.$axios.get('/recommend/resource');
      },

      // 获取每日推荐歌曲
      async getRecommendSongs () {
        const { data } = await this.$axios.get('/recommend/songs');
      },
      /**
       * @Description 获取独家放送歌单
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getSoleList () {
        const { data } = await this.$axios.get('/personalized/privatecontent');
        if (data.code === 200) {
          this.soleList = data.result;
        }
      },
      /**
       * @Description 获取最新音乐
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getNewSongList () {
        const { data } = await this.$axios.get('/personalized/newsong', {
          params: {
            // 获取的数据量
            limit: 12,
          },
        });
        if (data.code === 200) {
          this.newSongList = data.result;
        }
      },
      /**
       * @Description 获取MV信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getMvList () {
        const { data } = await this.$axios.get('/personalized/mv');
        if (data.code === 200) {
          this.mvList = data.result;
        }
      },
      /**
       * @Description 获取主播电台信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      async getRadioList () {
        const { data } = await this.$axios.get('/personalized/djprogram');
        if (data.code === 200) {
          this.radioList = data.result;
        }
      },
      /**
       * @Description 推荐歌单详细信息
       * @author wangkangzhang
       * @date 2021/5/31
      */
      async playListDetail (id) {
        // this.$emit('playList', {id, isShowPlayListDetail: true});
        this.$router.push(`/playListDetail?id=${id}`);
      },
      /**
       * @Description 独家放送详细信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      soleListDetail (id) {},
      /**
       * @Description 最新音乐详细信息
       * @author wangkangzhang
       * @date 2021/6/1
      */
      musicPlayListDetail (item) {
        this.$store.dispatch('getSongUrlFn', item.id);
        this.$store.dispatch('getSongDetailFn', item.id);
      },
      /**
       * @Description 推荐详细信息
       * @author wangkangzhang
       * @date 2021/6/1
       */
      MVPlayListDetail (id) {}
    }
  }
</script>

<style lang="less" scoped>
.container {
  padding: 0 30px;
  .title {
    cursor:pointer
  }
  .carousel {
  }
  .list {
    /*display: flex;*/
    float: left;
    width: 100%;
    /*height: 560px;*/
    min-width: 100%;
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
        .playCount {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0.5;
          color: #ffffff;
          margin: 15px;
        }
        &:hover .playCount {
          display: none;
        }
        .playBtn {
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
        &:hover .playBtn {
          display: block;
        }
      }
    }
  }
  .list-container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .list-content {
      width: 19%;
      height: 20%;
      padding: 5px;
    }
  }
  .sole {
    width: 100%;
    height: 250px;
    display: flex;
    .soleList {
      width: 355px;
      height: 250px;
      padding: 10px 25px 10px 0;
      .soleListImg {
        width: 355px;
        height: 200px;
        padding: 5px;
        background-repeat: no-repeat;
      }
      .soleListTitle {
        font-size: 14px;
      }
      .solePlayBtn {
        width: 25px;
        height: 25px;
        line-height: 25px;
        /*margin: 5px;*/
        border-radius: 15px;
        text-align: center;
        border: 1px solid #ffffff;
        color: #ffffff;
      }
    }
  }
  .latestMusic {
    height: 250px;
    width: 100%;
    min-width: 1134px;
    padding-top: 15px;
    .latestMusicList {
      height: 50px;
      width: 355px;
      float: left;
      display: flex;
      padding-bottom: 10px;
      .musicImg {
        width: 50px;
        height: 50px;
        text-align: center;
        /*display: flex;*/
        line-height: 50px;
        .musicPlayBtn {
          i {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            background-color: #ffffff;
            opacity: 0.8;
            color: #ec4141;
          }
        }
      }
      .musicContent {
        width: 305px;
        height: 50px;
        .top {
          padding-left: 10px;
          width: 305px;
          height: 25px;
          font-size: 14px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow:ellipsis;
          span {
            color: #9f9f9f;
          }
        }
        .bottom {
          padding-left: 10px;
          width: 305px;
          height: 25px;
          display: flex;
          /*.icon {*/
          /*  width: 105px;*/
          /*}*/
          .author {
            /*width: 100%;*/
            color: #9f9f9f;
            font-size: 14px;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow:ellipsis;
          }
        }
      }
    }
  }
  .MV {
    width: 100%;
    display: flex;
    height: 230px;
    margin-top: 10px;
    .MVList {
      position: relative;
      width: 270px;
      height: 150px;
      padding: 10px 15px 10px 0;
      .MVImg {
        width: 100%;
        border-radius: 5px;
        height: 150px;
        .copywriter {
          background-color: #182d36;
          opacity: 0.5;
          color: #ffffff;
          padding: 5px;
          display: none;
        }
        &:hover .copywriter {
          display: block;
        }
        .btn {
          position: absolute;
          right: 0;
          top: 0;
          opacity: 0.5;
          color: #ffffff;
          /*background-color: #182d36;*/
          margin: 15px;
        }
        &:hover .btn {
          display: none;
        }
      }
      .title {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
      }
      .name {
        color: #9f9f9f;
        font-size: 14px;
      }
    }
  }
  .radio {
    height: 250px;
    /*display: flex;*/
    .radioList {
      /*display: flex;*/
      width: 180px;
      float: left;
      padding: 10px 9px 10px 0;
      .bgImg {
        height: 180px;
        width: 180px;
      }
      .title {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow:ellipsis;
      }
    }
  }
}
</style>
