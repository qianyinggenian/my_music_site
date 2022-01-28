<template>
  <div class="singer-container">
    <div class="top">
      <div class="left">
        <img :src="artist.img1v1Url" alt="">
      </div>
      <div class="right">
        <div class="name">{{artist.name}}</div>
        <div class="alias">{{artist.alias[0]}}</div>
        <div class="collect">
          <i class="el-icon-folder-add"></i> 收藏
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
        <div>专辑</div>
        <div>MV</div>
        <div>歌手详情</div>
        <div>相似歌手</div>
      </div>
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
      <div class="album-first" v-if="modelType === 'first'">
        <div class="album-container" v-for="(item,index) in hotAlbums" :key="index">
          <img :src="item.blurPicUrl" alt="">
          <div></div>
          <div class="publishTime"></div>
        </div>
      </div>
      <div class="album-third" v-if="modelType === 'third'">
        <div class="left">
          <img src="./img/top50.png" alt="">
        </div>
        <div class="right">
          <div class="header">热门50首<i class="el-icon-video-play"></i><i class="el-icon-folder-add"></i></div>
          <div class="content">
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
      <el-tabs v-if="false" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="first">
          <div class="album-first" v-if="modelType === 'first'">
            <div class="album-container" v-for="(item,index) in hotAlbums" :key="index">
              <img :src="item.blurPicUrl" alt="">
              <div></div>
              <div class="publishTime"></div>
            </div>
          </div>
          <div class="album-third" v-if="modelType === 'third'">
            <div class="left">
              <img src="./img/top50.png" alt="">
            </div>
            <div class="right">
              <div class="header">热门50首<i class="el-icon-video-play"></i><i class="el-icon-folder-add"></i></div>
              <div class="content">
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
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">MV</el-tab-pane>
        <el-tab-pane label="歌手详情" name="third">歌手详情</el-tab-pane>
        <el-tab-pane label="相似歌手" name="fourth">相似歌手</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { formatDuration } from '@/utils/util'
  import axios from 'axios';
  export default {
    name: "index",
    data () {
      return {
        modelType: 'third',
        collectIndex: null,
        collect: false,
        activeName: 'first',
        singerId: '',
        detail: {},
        artist: {},
        hotSongs: [], // 热门歌曲
        hotAlbums: [] // 热门专辑
      };
    },
    mounted () {
      this.singerId = this.$route.query.id;
      this.getInfo();
    },
    methods: {
      getInfo () {
        this.getSingerInfo();
        this.getSingerDesc();
        this.getSingerMv();
        this.getSingerArtists();
        this.getSingerAlbum();
        this.getSingerSame();
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
      },
      /**
       * @Description 获取歌手 mv
       * @author wangkangzhang
       * @date 2022/1/27
       */
      async getSingerMv () {
        const { data } = await this.$axios.get('/artist/mv', {
          params: {
            id: this.singerId
          },
        });
      },
      /**
       * @Description 获取歌手单曲
       * @author wangkangzhang
       * @date 2022/1/27
       */
      async getSingerArtists () {
        const { data } = await this.$axios.get('/artists', {
          params: {
            id: this.singerId
          },
        });
        if (data.code === 200) {
          this.artist = data.artist;
          this.hotSongs = data.hotSongs.map(val => {
            val.dt = formatDuration(val.dt);
            return val;
          });
        }
      },
      /**
       * @Description 获取歌手专辑
       * @author wangkangzhang
       * @date 2022/1/27
       */
      async getSingerAlbum () {
        const { data } = await this.$axios.get('/artist/album', {
          params: {
            id: this.singerId,
            limit: 30
          },
        });
        if (data.code === 200) {
          this.hotAlbums = data.hotAlbums;
        }
      },
      /**
       * @Description 获取相似歌手
       * @author wangkangzhang
       * @date 2022/1/27
       */
      async getSingerSame () {
        const { data } = await this.$axios.get('/simi/artist', {
          params: {
            id: this.singerId
          },
        });
      },
      /**
       * @Description 专辑显示模式
       * @author wangkangzhang
       * @date 2022/1/28
       */
      handleChangeModel (val) {
        console.log(val);
        this.modelType = val;
        console.log(this.modelType);
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2022/1/27
       */
      handleClick () {},
      /**
       * @Description 是否收藏热门歌曲
       * @author wangkangzhang
       * @date 2022/1/27
       */
      handleCollect (val,index) {
        this.collect = val;
        this.collectIndex = index;
      },
      /**
       * @Description 下载
       * @author wangkangzhang
       * @date 2022/1/27
       */
      async handleDownload (params) {
        const { data } = await this.$axios.get('/song/url', {
          params: {
            // 获取的数据量
            id: params.id
          },
        });
        if (data.code === 200) {
          if (data.data[0].url) {
            await  this.$store.dispatch('downloadMusic', {url: data.data[0].url, name: params.name});
          } else {
            this.$message.error('抱歉，该歌曲暂时不能下载！');
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .singer-container {
    height: 100%;
    width: 100%;
    .top {
      padding: 10px;
      height: 180px;
      width: calc(100% - 20px);
      display: flex;
      background-color: #2b2b2b;
      border-radius: 5px 5px 0 0;
      .left {
        height: 100%;
        width: 180px;
        img {
          height: 100%;
          width: 180px;
          border-radius: 5px;
        }
      }
      .right {
        margin-left: 10px;
        font-size: 20px;
        color: #ffffff;
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
        .collect {
          border: 1px solid #ffffff;
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          border-radius: 15px;
          i {
            margin-right: 10px;
          }
        }
      }
    }
    .bottom {
      padding: 10px;
      height: calc(100% - 220px);
      width: calc(100% - 20px);
      position: relative;
      /*overflow-y: auto;*/
      background-color: #2b2b2b;
      ::v-deep .el-tabs__item {
        color: #ffffff !important;
      }
      ::v-deep.el-tabs__active-bar {
        background-color: #ec4141 !important;
      }
      .title {
        background-color: #ec4141;
        height: 30px;
        line-height: 30px;
        display: flex;
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
          height: 500px;
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
          .content {
            height: calc(100% - 50px);
            overflow-y: auto;
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
          .active {
            background-color: #2e2e2e;
          }
        }
      }
      .album-first {
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        .album-container {
          width: 260px;
          height: 310px;
          img {
            width: 250px;
            height: 220px;
          }
        }
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
      .activeModel {
        background-color: #5f5f5f;
        color: #ffffff;
      }
    }
  }

</style>
