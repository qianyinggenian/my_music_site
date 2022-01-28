<template>
  <div class="container">
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="first">
          <div class="album">
            <div class="left">
              <img src="./img/top50.png" alt="">
            </div>
            <div class="right">
              <div class="header">热门50首<i class="el-icon-video-play"></i><i class="el-icon-folder-add"></i></div>
              <div class="hot" v-if="index <= 9 " :class="(index + 1) % 2 === 1 ? 'active' : ''" v-for="(item,index) in hotSongs" :key="index">
                <div class="content">
                  <div class="content-left">
                    <span v-if="index === 9">{{index + 1}}</span>
                    <span v-else>0{{index + 1}}</span>
                    <i class="el-icon-star-on" v-if="collect && collectIndex === index" @click="handleCollect(false,index)"></i>
                    <i class="el-icon-star-off" v-else @click="handleCollect(true,index)"></i>
                    <i class="icon iconfont icon-xiazai1" @click="handleDown(item.id)"></i>
                  </div>
                  <div class="content-middle">{{item.name}}</div>
                  <div class="content-right">{{item.dt}}</div>
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
        collectIndex: null,
        collect: false,
        activeName: 'first',
        singerId: '',
        detail: {},
        artist: {},
        hotSongs: []
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
       * @Description
       * @author wangkangzhang
       * @date 2022/1/27
      */
      async handleDown (id) {
        const { data } = await this.$axios.get('/song/download/url', {
          params: {
            id
          },
        });
      },
      down (url) {
        // eslint-disable-next-line no-unused-vars
        // let downUrl = this.$refs.audio.src; // 音乐地址 : 例如: http://m10.music.126.net/20201119111830/51f6bbc51ea067e9d258fa73183b16b1/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2828582250/29aa/7bcc/f324/6699f160b0c39b010e6e009d271e4948.mp3
        let downUrl = url; // 音乐地址 : 例如: http://m10.music.126.net/20201119111830/51f6bbc51ea067e9d258fa73183b16b1/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2828582250/29aa/7bcc/f324/6699f160b0c39b010e6e009d271e4948.mp3
        // eslint-disable-next-line no-unused-vars
        let fileName = playerApi.downFileName; // 文件名设置: 起风了
        // eslint-disable-next-line no-unused-vars
        axios({
          method: 'get',
          url: downUrl,
          responseType: 'blob',
          headers: {'content-type': 'audio/mpeg'}
          // headers: {'content-length': '4066786', 'content-type': 'audio/mpeg'}
        }).then((res) => {
          // eslint-disable-next-line no-unused-vars
          let blobType = 'application/force-download'; // 设置blob请求头
          // eslint-disable-next-line no-unused-vars
          let blob = new Blob([res.data], {type: res.data.type}); // 创建blob 设置blob文件类型 data 设置为后端返回的文件(例如mp3,jpeg) type:这里设置后端返回的类型 为 mp3
          let downa = document.createElement('a'); // 创建A标签
          // eslint-disable-next-line no-unused-vars
          let href = window.URL.createObjectURL(blob); // 创建下载的链接
          downa.href = href; // 下载地址
          downa.download = fileName; // 下载文件名
          document.body.appendChild(downa);
          downa.click(); // 模拟点击A标签
          document.body.removeChild(downa); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放blob对象
        }).catch(function (error) {
          console.log(error)
        })
      },
    }
  }
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  overflow-y: auto !important;
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
    overflow-y: auto;
    background-color: #2b2b2b;
    ::v-deep .el-tabs__item {
      color: #ffffff !important;
    }
    ::v-deep.el-tabs__active-bar {
      background-color: #ec4141 !important;
    }
    .album {
      height: 100%;
      width: 100%;
      display: flex;
      .left {
        width: 200px;
        img {
          width: 145px;
          height: 145px;
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
        .active {
          background-color: #2e2e2e;
        }
      }
    }
  }
}

</style>
