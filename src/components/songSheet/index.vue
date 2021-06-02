<template>
  <div class="playlists-container">
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
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
                <el-button class="btn" size="small" round>全部歌单</el-button>
              </div>
              <div class="bottom">
                <div class="bottomContent" style="margin-top: 20px">
                 <div class="left">{{categories[0]}}
                 </div>
                 <div class="right">
                  <span  v-for="(item,index) in languages" :key="index">{{item.name}}
                    <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                  </span>
                 </div>
                </div>
                <div class="bottomContent">
                  <div class="left">{{categories[1]}}</div>
                  <div class="right">
                    <span v-for="(item,index) in styleList" :key="index">{{item.name}}
                      <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                    </span>
                  </div>
                </div>
                <div class="bottomContent">
                  <div class="left">{{categories[2]}}</div>
                  <div class="right">
                    <span v-for="(item,index) in sceneList" :key="index">{{item.name}}
                      <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                    </span>
                  </div>
                </div>
                <div class="bottomContent">
                  <div class="left">{{categories[3]}}</div>
                  <div class="right">
                    <span v-for="(item,index) in emotionList" :key="index">{{item.name}}
                      <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                    </span>
                  </div>
               </div>
                <div class="bottomContent">
                  <div class="left">{{categories[4]}}</div>
                  <div class="right" >
                    <span v-for="(item,index) in themeList" :key="index">{{item.name}}
                      <i v-if="item.hot" class="icon iconfont icon-hot"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="right">
          <span v-for="(item,index) in hotList" :key="index">
            {{item.name}}
          </span>
        </div>
      </div>
      <div class="tab-content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "songSheet",
    data () {
      return {
        selected: '',
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
      };
    },
    watch: {
      // 监听 selected 变化
      selected() {
        // 获取新的顶部精品歌单
        this.getTopList(1, this.selected)

        // 获取新的歌单列表
        this.getList(50, this.selected)
      },
    },
    mounted() {
      this.getTopList(1, '全部');
      // 获取新的歌单列表
      this.getList(50, this.selected);
      this.getCatlistFn();
      this.getHotlistFn();
    },
    methods: {
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
          this.topList = data.playlists[0]
        }
      },
      /**
       * @Description 获取歌单分类
       * @author wangkangzhang
       * @date 2021/6/2
      */
      async getCatlistFn () {
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
      async getHotlistFn () {
        const {data} = await this.$axios.get('/playlist/hot');
        if (data.code === 200) {
          this.hotList = data.tags;
        }
      },
      // 获取歌单列表
      async getList(limit, cat, offset = 0) {
        const { data: data } = await this.$axios.get('/top/playlist/', {
          params: {
            limit,
            offset,
            cat,
          },
        });
        if (data.code === 200) {
          this.paginationForm.total = data.total;
          this.list = data.playlists
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .playlists-container {
    margin: 0 65px;
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
          }
        }
      }
      .tab-content {
      }
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
