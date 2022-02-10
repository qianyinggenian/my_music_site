<template>
  <div class="singer-container">
    <div class="top">
      <div class="left">
        <img :src="user.avatarUrl" alt="">
      </div>
      <div class="right">
        <div class="name">{{user.nickname}}</div>
        <div class="tool">
          <div class="imageDesc">
            <img :src="identify.imageUrl"><span>{{identify.imageDesc}}</span>
          </div>
          <div class="gender" :class="user.gender === 1 ? 'gender1' : 'gender2'">
            <i class="el-icon-male" v-if="user.gender === 1"></i>
            <i class="el-icon-female" v-else></i>
          </div>
          <div class="tool-right">
            <div class="div" @click="singerDetailFn"> <i class="el-icon-microphone"></i> 歌手页</div>
            <div class="div"> <i class="el-icon-message"></i> 发私信</div>
            <div class="div"> <i class="el-icon-plus"></i> 关注</div>
            <div class="more"> <i class="el-icon-more"></i></div>
          </div>
        </div>
        <div class="type">
          <span>单曲数：{{artist.musicSize}}</span>
          <span>专辑数：{{artist.albumSize}}</span>
          <span>MV数：{{artist.mvSize}}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <div :class="activeName === 'first' ? 'activeTitle' : ''" @click="handleChangeTabs('first')">创建的歌单</div>
        <div :class="activeName === 'second' ? 'activeTitle' : ''"  @click="handleChangeTabs('second')">收藏的歌单</div>
        <div :class="activeName === 'third' ? 'activeTitle' : ''"  @click="handleChangeTabs('third')">创建的音乐专栏</div>
        <div class="model" v-if="activeName === 'first'">
        <span title="大图模式" :class="modelType === 'first' ? 'activeModel' : ''" @click="handleChangeModel('first')">
          <i class="iconfont icon-dasuolvetuliebiao"></i>
        </span>
          <span title="列表模式" :class="modelType === 'second' ? 'activeModel' : ''"  @click="handleChangeModel('second')">
          <i class="iconfont icon-danlieliebiao"></i>
        </span>
          <span title="图列模式" :class="modelType === 'third' ? 'activeModel' : ''" @click="handleChangeModel('third')">
          <i class="iconfont icon-liebiao"></i>
        </span>
        </div>
      </div>
      <div class="content">
        <div class="album" v-if="activeName === 'first'">
          <div class="album-first" v-if="modelType === 'first'">
            <div class="album-container" v-for="(item,index) in hotAlbums" :key="index" @click="handleAlbumDetail(item.id)">
              <div class="blurPicUrl" :style="{background: 'url(' + item.blurPicUrl +')', backgroundSize:'cover'}">
                <div class="playBtn"><i class="el-icon-video-play "></i></div>
              </div>
              <div class="albumName">{{item.name}}<span>{{item.alias[0]}}</span></div>
              <div class="publishTime">发布时间：{{item.publishTime}}</div>
            </div>
          </div>
          <div class="album-second" v-if="modelType === 'second'">
            <div class="content" :class="(index + 1) % 2 === 1 ? 'active' : ''" v-for="(item,index) in hotAlbums" :key="index" >
              <div class="album-container">
                <div class="blurPicUrl" :style="{background: 'url(' + item.blurPicUrl +')', backgroundSize:'cover'}" @click="handleAlbumDetail(item.id)">
                </div>
                <div class="albumName" @click="handleAlbumDetail(item.id)">{{item.name}}<span>{{item.alias[0]}}</span></div>
                <div class="num">{{item.size}}首</div>
                <div class="publishTime">发行时间：{{item.publishTime}}</div>
              </div>
            </div>
          </div>
          <div class="album-third" v-if="modelType === 'third'">
            <div class="left">
<!--              <img src="./img/top50.png" alt="">-->
            </div>
            <div class="right">
              <div class="header">热门50首<i class="el-icon-video-play"></i><i class="el-icon-folder-add"></i></div>
              <div class="hot" :class="(index + 1) % 2 === 1 ? 'active' : ''" v-for="(item,index) in hotSongs" :key="index">
                  <div class="content">
                    <div class="content-left">
                      <span v-if="index >= 9">{{index + 1}}</span>
                      <span v-else>0{{index + 1}}</span>
                      <i class="el-icon-star-on" v-if="collect && collectIndex === index" @click="handleCollect(false,index)"></i>
                      <i class="el-icon-star-off" v-else @click="handleCollect(true,index)"></i>
                      <i class="iconfont icon-xiazai1" @click="handleDownload(item)"></i>
                    </div>
                    <div class="content-middle">{{item.name}}</div>
                    <div class="content-right">{{item.dt}}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="MV" v-if="activeName === 'second'">
          <div class="content" v-for="(item,index) in mvs" :key="index" @click="handleMvDetail(item.id)">
            <div class="imgurl" :style="{background: 'url(' + item.imgurl +')', backgroundSize:'cover'}">
              <div class="playCount"><i class="el-icon-video-play "></i>
              <span v-if="item.playCount > 100000">{{parseInt((item.playCount)/10000)}}万</span>
              <span v-else>{{item.playCount}}</span>
              </div>
              <div class="duration">{{item.duration}}</div>
            </div>
            <div class="mvName" :title="item.name">{{item.name}}</div>
          </div>
        </div>
        <div class="detail" v-if="activeName === 'third'">
          <div class="singerDetail" v-for="(item, index) in introduction" :key="index">
            <div class="ti">{{item.ti}}</div>
            <div class="txt">{{item.txt}}</div>
          </div>
        </div>
        <div class="same" v-if="activeName === 'fourth'">
          <div class="same-first">
            <div class="same-container" v-for="(item,index) in artists" :key="index" @click="singerDetailFn(item.id)">
              <div class="blurPicUrl">
                <img :src="item.img1v1Url" alt="">
              </div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDuration, formatDate } from '@/utils/util'
  export default {
    name: "index",
    data () {
      return {
        modelType: 'third',
        collectIndex: null,
        collect: false,
        activeName: 'first',
        singerId: '',
        user: {},
        identify: {},
        detail: {},
        descDetail: {}, // 歌手描述详情
        introduction: [],
        artist: {},
        alias: [],
        artists: [], // 相似歌手
        mvs: [],
        hotSongs: [], // 热门歌曲
        hotAlbums: [] // 热门专辑
      };
    },

    watch: {
      '$route': {
        handler (val) {
          if (val && val.length > 0) {
          }
          this.modelType= 'third';
          this.activeName = 'first';
          this.getInfo();
        },
        immediate: true
      }
    },
    methods: {
      getInfo () {
        this.singerId = this.$route.query.id;
        this.getSingerInfo();
        this.getSingerDesc();
      },
      /**
       * @Description 获取歌手详情信息
       * @author wangkangzhang
       * @date 2022/1/27
      */
      async getSingerInfo () {
        const { data } = await this.$axios.get('/artist/detail', {
          params: {
            id: this.singerId
          },
        });
        if (data.code === 200) {
          this.detail = data.data;
          this.user = this.detail.user;
          this.identify = this.detail.identify;
        }
      },
      /**
       * @Description 获取歌手描述
       * @author wangkangzhang
       * @date 2022/1/27
      */
      async getSingerDesc () {
        const { data } = await this.$axios.get('/artist/desc', {
          params: {
            id: this.singerId
          },
        });
        if (data.code === 200) {
          this.descDetail = data;
          this.introduction = this.descDetail.introduction;
        }
      },
      /**
       * @Description MV详情
       * @author wangkangzhang
       * @date 2022/1/29
      */
      handleMvDetail (id) {},
      /**
       * @Description 专辑显示模式
       * @author wangkangzhang
       * @date 2022/1/28
      */
      handleChangeModel (val) {
        console.log(val);
        this.modelType = val;
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2022/1/27
      */
      handleChangeTabs (val) {
        this.activeName = val;
      },
      /**
       * @Description 歌手详情
       * @author wangkangzhang
       * @date 2022/1/27
       */
      singerDetailFn (id) {
        this.$router.push(`/singerDetail?id=${this.singerId}`);
      }
    }
  }
</script>

<style lang="less" scoped>
.singer-container {
  height: calc(100vh - 160px);
  width: 100%;
  overflow-y: auto;
  background-color: #2b2b2b;
  .top {
    padding: 10px;
    height: 180px;
    width: calc(100% - 20px);
    display: flex;
    border-radius: 5px 5px 0 0;
    .left {
      height: 100%;
      width: 180px;
      img {
        height: 100%;
        width: 180px;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 10px;
      font-size: 20px;
      color: #ffffff;
      width: calc(100% - 180px);
      .name {
        font-weight: bolder;
        font-size: 22px;
      }
      div {
        margin: 5px 0;
      }
      .type {
        display: flex;
        font-size: 18px;
        span {
          margin: 0 10px;
        }
      }
      .tool {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #434343;
        width: 100%;
        height: 30px;
        padding-bottom: 5px;
        position: relative;
      }
      .imageDesc {
        border: 1px solid #ffffff;
        /*width: 80px;*/
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 15px;
        font-size: 16px;
        background-color: #fde4e2;
        img {
          height: 15px;
          width: 15px;
          margin: 0 5px 0 1px;
        }
        span {
          color: #ec4141;
          padding-right: 5px;
        }
      }
      .gender {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
      }
      .gender1 {
        color: #3081a3;
        font-size: 16px;
        background-color: #2b5e6a;
      }
      .gender2 {
        color: #ae3669;
        font-size: 16px;
        background-color: #6a3853;
      }
      .tool-right {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        .div {
          border: 1px solid #434343;
          display: flex;
          margin: 0 5px;
          justify-content: center;
          align-items: center;
          height: 20px;
          font-size: 16px;
          border-radius: 15px;
          padding: 5px 5px;
          cursor: pointer;
          i {
            margin-right: 10px;
          }
        }
        ::v-deep .el-icon-plus {
          color: #ec4141;
        }
        .more {
          border: 1px solid #434343;
          height: 30px;
          width: 30px;
          display: flex;
          font-size: 16px;
          color: #434343;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
        }
      }
    }
  }
  .bottom {
    padding: 0 10px;
    height: calc(100% - 180px);
    width: calc(100% - 20px);
    position: relative;
    .title {
      height: 30px;
      line-height: 30px;
      display: flex;
      color: #ffffff;
      cursor: pointer;
      margin-bottom: 5px;
      div {
        margin: 0 10px;
      }
      .model {
        height: 25px;
        line-height: 25px;
        width: 100px;
        position: absolute;
        right: 10px;
        color: #555555;
        z-index: 2030;
        margin-top: 5px;
        span {
          width: 25px;
          height: 25px;
          margin: 0 5px;
          background-color: #343434;
        }
        i {
          padding: 5px;
        }
      }
    }
    .activeModel {
      background-color: #5f5f5f;
      color: #ffffff;
    }
    .activeTitle {
      padding-bottom: 2px;
      border-bottom: 2px solid red;
    }
    .active {
      background-color: #2e2e2e;
    }
    .content {
      overflow-y: auto;
      .album {
        .album-first {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          width: 100%;
        }
        .album-container {
          width: 260px;
          height: 300px;
          margin: 0 5px;
          .blurPicUrl {
            width: 250px;
            height: 220px;
            border-radius: 5px;
            line-height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            .playBtn {
              display: none;
            }
            i {
              color: #ec4141;
              font-size: 30px;
            }
            &:hover .playBtn {
              display: block;
            }
          }
          .albumName {
            color: #ffffff;
            span {
              margin: 0 10px;
              color: #606666;
            }
          }
          .publishTime {
            color: #606666;
            font-size: 14px;
          }
        }
        .album-second {
          height: 100%;
          width: 100%;
          .content {
            .album-container {
              height: 80px;
              width: calc(100% - 10px);
              display: flex;
              margin: 0 5px;
              align-items: center;
              .blurPicUrl {
                height: 60px;
                width: 60px;
                border-radius: 5px;
                cursor: pointer;
              }
              .albumName {
                margin-left: 10px;
                cursor: pointer;
                width: calc(70% - 60px);
              }
              .num {
                width: 10%;
                color: #606666;
              }
              .publishTime {
                width: 20%;
                color: #606666;
                font-size: 14px;
              }

            }
            &:hover .album-container {
              background-color: #373737;
            }
          }
        }
        .album-third {
          height: 100%;
          width: 100%;
          display: flex;
          .left {
            width: 200px;
            img {
              width: 145px;
              height: 145px;
              border-radius: 5px;
            }
          }
          .right {
            width: 100%;
            padding: 0 10px;
            .header {
              font-size: 20px;
              font-weight: bold;
              color: #ffffff;
              i {
                margin: 10px;
                color: #ec4141;
              }
            }
            .hot {
              .content {
                display: flex;
                line-height: 30px;
                width: 100%;
                height: 30px;
                margin: 5px 0;
                color: #555555;
                .content-left {
                  width: 100px;
                  color: #555555;
                  padding: 0 10px;
                  i {
                    margin: 0 10px;
                  }
                }
                .content-middle {
                  width: calc(100% - 250px);
                  color: #ffffff;
                }
                .content-right {
                  width: 150px;
                }
              }
              &:hover .content {
                background-color: #373737;
              }
            }
          }
        }
      }
    }
    .detail {
      margin: 10px 0;
      .singerDetail {
        margin: 10px 0;
        .ti {
          color: #ffffff;
          margin: 10px;
        }
        .txt {
          white-space: pre-line;
          color: #878787;
          margin: 10px 10px 10px 40px;
        }
      }
    }
    .MV {
      margin: 10px 0;
      display: flex;
      flex-wrap: wrap;
      .content {
        width: 320px;
        height: 220px;
        margin: 0 5px;
        cursor: pointer;
        .imgurl {
          height: 180px;
          width: 100%;
          border-radius: 5px;
          position: relative;
          .playCount {
            color: #ffffff;
            position: absolute;
            top: 2px;
            right: 5px;
            i {
              color: #ec4141;
            }
          }
          .duration {
            color: #ffffff;
            position: absolute;
            bottom: 2px;
            right: 5px;
          }
        }
        .mvName {
          overflow:hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow:ellipsis;
          color: #ffffff;
          width: 320px;
          font-size: 14px;
          margin: 5px 0;
        }
      }
    }
    .same {
      margin: 10px 0;
      .same-first {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
      .same-container {
        width: 320px;
        height: 345px;
        margin: 0 5px;
        .blurPicUrl {
          width: 100%;
          height: 315px;
          border-radius: 5px;
          line-height: 220px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .name {
          color: #ffffff;
          span {
            margin: 0 10px;
            color: #606666;
          }
        }
        .publishTime {
          color: #606666;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
