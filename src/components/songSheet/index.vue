<template>
    <div class="playlists-container">
      <div class="top-card" v-if="more">
        <div class="icon-wrap">
          <!-- 封面 -->
          <img :src="topList.coverImgUrl" alt="" />
        </div>
        <div class="content-wrap">
          <div class="tag">
            <i class="el-icon-trophy"></i>精品歌单</div>
          <!-- 标题 -->
          <div class="title">{{ topList.name }}</div>
          <!-- 介绍 -->
          <div class="info">
            {{ topList.description }}
          </div>
        </div>
        <!-- 背景 -->
        <img v-lazy="topList.coverImgUrl" alt="" class="bg" />
        <div class="bg-mask"></div>
      </div>
      <div class="tab-container">
        <div class="tab-bar">
          <div class="left">
            <el-popover
                placement="bottom-start"
                :visible-arrow="false"
                width="750"
                trigger="click">
              <el-button size="small" slot="reference">{{barName}} <i class="el-icon-arrow-right"></i></el-button>
              <div class="leftContent">
                <div class="top">
                  <el-button class="btn" size="small" round @click="select('全部')">全部歌单</el-button>
                </div>
                <div class="bottom">
                  <div class="bottomContent" style="margin-top: 20px">
                    <div class="left">{{categories[0]}}
                    </div>
                    <div class="right">
                <span  v-for="(item,index) in languages" :key="index" @click="select(item.name)">{{item.name}}
                  <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                </span>
                    </div>
                  </div>
                  <div class="bottomContent">
                    <div class="left">{{categories[1]}}</div>
                    <div class="right">
                  <span v-for="(item,index) in styleList" :key="index" @click="select(item.name)">{{item.name}}
                    <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                  </span>
                    </div>
                  </div>
                  <div class="bottomContent">
                    <div class="left">{{categories[2]}}</div>
                    <div class="right">
                  <span v-for="(item,index) in sceneList" :key="index" @click="select(item.name)">{{item.name}}
                    <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                  </span>
                    </div>
                  </div>
                  <div class="bottomContent">
                    <div class="left">{{categories[3]}}</div>
                    <div class="right">
                  <span v-for="(item,index) in emotionList" :key="index" @click="select(item.name)">{{item.name}}
                    <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                  </span>
                    </div>
                  </div>
                  <div class="bottomContent">
                    <div class="left">{{categories[4]}}</div>
                    <div class="right" >
                  <span v-for="(item,index) in themeList" :key="index" @click="select(item.name)">{{item.name}}
                    <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                  </span>
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
          <div class="right">
            <span v-for="(item,index) in hotList" :key="index" @click="select(item.name)">
              {{item.name}}
            </span>
          </div>
        </div>
        <div class="tab-content">
          <div class="content" v-for="(item,index) in list" :key="index"  @click="listDetail(item.id)">
            <div class="img">
              <img class="img" :src="item.coverImgUrl" alt="">
              <div class="count">
                <i class="el-icon-caret-right"></i>
                <span v-if="item.playCount >= 10000">
              {{Math.round(item.playCount/10000)}}万
            </span>
                <span v-else>{{item.playCount}}</span>
              </div>
              <div class="btn">
                <i class="el-icon-caret-right"></i>
              </div>
              <div class="user">
                <i class="el-icon-user"></i>
                {{item.creator.nickname}}
                <i style="color: #ec4141" class="icon iconfont icon-guanjianci" v-if="item.creator.userType ===4"></i>
              </div>
            </div>
            <div class="title">{{item.name}}</div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
              background
              :page-size="pageSize"
              :current-page="pageNum"
              :page-sizes="[5, 10, 15, 20, 50]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "songSheet",
    data () {
      return {
        selected: '全部',
        topList: {},
        barName: '全部歌单',
        categories: [], // 分类类型
        catList: [], // 歌单分类
        languages: [], // 语种
        styleList: [], // 风格
        sceneList: [], // 场景
        emotionList: [], // 情感
        themeList: [], // 主题
        hotList: [], // 热门歌单分类
        list: [], // 歌单列表
        total: 0, // 总数
        pageSize: 50,
        pageNum: 0,
        more: true
      };
    },
    mounted() {
      this.getTopList(1, '全部');
      // 获取新的歌单列表
      this.getList(50, this.selected);
      this.getCatListFn();
      this.getHotListFn();
      this.getListFn();
    },
    methods: {
      select (val) {
        this.selected = val;
          this.getTopList(1, this.selected);
          // 获取新的歌单列表
          this.getList(50, this.selected);
      },
      // 获取顶部精品歌单
      async getTopList(limit, cat) {
        // 顶部 精品歌单
        const { data: data } = await this.$axios.get('/top/playlist/highquality', {
          params: {
            limit,
            cat,
          },
        });
        if (data.code === 200) {
          this.topList = data.playlists[0];
          this.more = data.more;
        }
      },
      /**
       * @Description 获取歌单分类
       * @author wangkangzhang
       * @date 2021/6/2
      */
      async getCatListFn () {
        const { data } = await this.$axios.get('/playlist/catlist');
        if (data.code === 200) {
          this.catList = data.sub;
          this.categories = data.categories;
        }
        for (const key of this.catList) {
          if (key.category === 0) {
            this.languages.push(key);
          } else if (key.category === 1) {
            this.styleList.push(key);
          } else if (key.category === 2) {
            this.sceneList.push(key);
          } else if (key.category === 3) {
            this.emotionList.push(key);
          } else {
            this.themeList.push(key);
          }
        }
      },
      /**
       * @Description 获取热门分类
       * @author wangkangzhang
       * @date 2021/6/3
      */
      async getHotListFn () {
        const {data} = await this.$axios.get('/playlist/hot');
        if (data.code === 200) {
          this.hotList = data.tags;
        }
      },
      async getListFn () {
        const {data} = await this.$axios.get('/playlist/highquality/tags');
        if (data.code === 200) {
          // this.hotList = data.tags;
        }
      },
      // 获取歌单列表
      async getList(limit, cat, offset = 0) {
        const { data: data } = await this.$axios.get('/top/playlist/', {
          params: {
            limit,
            cat,
            offset
          },
        });
        if (data.code === 200) {
          this.list = data.playlists;
          this.total = data.total;
        }
      },
      /**
       * @Description 切换页
       * @author wangkangzhang
       * @date 2021/6/3
      */
      handleCurrentChange (val) {
        console.log('val1',val);
        this.getList(this.pageSize, this.selected, (val-1)*50);
      },
      /**
       * @Description
       * @author wangkangzhang
       * @date 2021/6/3
      */
      handleSizeChange (val) {
        console.log('val', val);
      },
      listDetail (id) {
        this.$router.push(`/playListDetail?id=${id}`);
      }
    }
  }
</script>
<style lang="less" scoped>
  .playlists-container {
    height: 100%;
    /*width: 100%;*/
    /*margin: 0 65px;*/
    padding: 0 60px;
    .top-card {
      padding: 20px;
      height: 160px;
      display: flex;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      .icon-wrap {
        margin-right: 20px;
        z-index: 1;
        img {
          width: 160px;
          height: 160px;
        }
      }
      .content-wrap {
        z-index: 1;
        .tag {
          color: #dfac67;
          border: 1px solid #dfac67;
          width: 100px;
          height: 30px;
          text-align: center;
          border-radius: 5px;
          font-size: 16px;
          line-height: 30px;
          cursor: pointer;
        }
        .title {
          color: white;
          padding-top: 10px;
        }
        .info {
          color: #888482;
          font-size: 14px;
          padding-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }
      }
      .bg {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        filter: blur(20px);
      }
      .bg-mask {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .tab-container {
      width: 100%;
      height: calc(100% - 300px);
      margin-top: 20px;
      .tab-bar {
        display: flex;

        .left {
          width: 55%;
          .el-button {
            border-radius: 20px;
          }
        }
        .right {
          width: 45%;
          span {
            padding-left: 8px;
            font-size: 14px;
            cursor:pointer;
          }
        }
      }
      .tab-content {
        margin-top: 20px;
        .content {
          float: left;
          width: 200px;
          height: 250px;
          padding-right: 14px;
          .img {
            width: 200px;
            height: 200px;
            border-radius: 5px;
            position: relative;
            background-size: contain;
            .count {
              color: #ffffff;
              background-color: #ec4141;
              position: absolute;
              right: 0;
              top: 0;
              height: 20px;
              display: none;
            }
            &:hover .count {
              display: block;
            }
            .btn {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 30px;
              height: 30px;
              border-radius: 15px;
              background-color: #ffffff;
              opacity: 0.6;
              margin: 10px;
              line-height: 30px;
              text-align: center;
              display: none;
              i {
                font-size: 20px;
                color: #ec4141;
              }
            }
            &:hover .btn {
              display: block;
            }
            .user {
              position: absolute;
              left: 0;
              bottom: 0;
              /*background-color: white;*/
              opacity: 0.6;
              margin: 2px;
              color: #f4ffff;
              font-size: 14px;
              i {
                padding: 5px;
              }
            }
          }
          .title {
            font-size: 14px;
            word-wrap: break-word;
            padding-bottom: 10px;
          }
        }
      }
    }
    .pagination {
      width: 100%;
      height: 100px;
      margin-top: 50px;
      /*display: flex;*/
      float: left;
      /*background-color: #ec4141;*/
      position: relative;
      bottom: 0;
    }
  }
  .leftContent {
    .top {
      height: 30px;
      line-height: 30px;
      padding: 10px;
      border-bottom: 1px solid #e5e5e5;
     .btn {
        background-color: #fdf5f5;
        color: #ec4141;
      }
    }
    .bottom {
      /*display: flex;*/
      .bottomContent {
        display: flex;
        /*height: 100px;*/
        .left {
          width: 15%;
        }
        .right {
          width: 85%;
          span {
            /*display: flex;*/
            float: left;
            width: 100px;
            height: 20px;
            padding-bottom: 5px;
            cursor:pointer;
          }
          i {
            color: #ec4141;
            position: relative;
            font-size: 14px;
            /*display: none;*/
          }
        }
      }
    }
  }
</style>
