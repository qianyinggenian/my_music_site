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
              width="600"
              trigger="click">
            <el-button size="small" slot="reference">{{barName}} <i class="el-icon-arrow-right"></i></el-button>
            <div class="leftContent">
              <div class="top">
                全部歌单
              </div>
              <div class="bottom">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="right">sdfger</div>
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
        barName: '全部歌单'
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
      this.getFn();
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
      async getFn () {
        const { data: data } = await this.$axios.get('/playlist/highquality/tags');
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
          width: 60%;
          .el-button {
            border-radius: 20px;
          }
          /deep/ .leftContent {
            height: 500px;
            .top {
              height: 50px;
              border-bottom: 1px solid red;
              background-color: #84bb58;
            }
            .bottom {
            }
          }
        }
        .right {
          width: 40%;
        }
      }
      .tab-content {
      }
    }
  }
</style>
