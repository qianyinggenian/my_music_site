<template>
  <div class="singer">
    <div class="container">
      <div class="top">
        <div class="type">
          <div class="title">语种：</div>
          <div class="all" :class="area === '-1' ? 'active': ''" @click="clickFn('', '-1', '')">全部</div>
          <div class="other" :class="area === '7' ? 'active': ''" @click="clickFn('', '7', '')">华语</div>
          <div class="other" :class="area === '96' ? 'active': ''" @click="clickFn('', '96', '')">欧美</div>
          <div class="other" :class="area === '8' ? 'active': ''" @click="clickFn('', '8', '')">日本</div>
          <div class="other" :class="area === '0' ? 'active': ''" @click="clickFn('', '0', '')">其他</div>
        </div>
        <div class="type">
          <div class="title">分类：</div>
          <div class="all" :class="type === '-1' ? 'active': ''" @click="clickFn('-1', '', '')">全部</div>
          <div class="other" :class="type === '1' ? 'active': ''" @click="clickFn('1', '', '')">男歌手</div>
          <div class="other" :class="type === '2' ? 'active': ''" @click="clickFn('2', '', '')">女歌手</div>
          <div class="other" :class="type === '3' ? 'active': ''" @click="clickFn('3', '', '')">乐队组合</div>
        </div>
        <div class="filter">
          <div class="left">
            <div class="title">筛选：</div>
          </div>
          <div class="right">
            <div class="popular" :class="initial === '-1' ? 'active': ''" @click="clickFn('', '', '-1')">热门</div>
            <div class="other" :class="initial === 'a' ? 'active': ''" @click="clickFn('', '', 'a')">A</div>
            <div class="other" :class="initial === 'b' ? 'active': ''" @click="clickFn('', '', 'b')">B</div>
            <div class="other" :class="initial === 'c' ? 'active': ''" @click="clickFn('', '', 'c')">C</div>
            <div class="other" :class="initial === 'd' ? 'active': ''" @click="clickFn('', '', 'd')">D</div>
            <div class="other" :class="initial === 'e' ? 'active': ''" @click="clickFn('', '', 'e')">E</div>
            <div class="other" :class="initial === 'f' ? 'active': ''" @click="clickFn('', '', 'f')">F</div>
            <div class="other" :class="initial === 'g' ? 'active': ''" @click="clickFn('', '', 'g')">G</div>
            <div class="other" :class="initial === 'h' ? 'active': ''" @click="clickFn('', '', 'h')">H</div>
            <div class="other" :class="initial === 'i' ? 'active': ''" @click="clickFn('', '', 'i')">I</div>
            <div class="other" :class="initial === 'j' ? 'active': ''" @click="clickFn('', '', 'j')">J</div>
            <div class="other" :class="initial === 'k' ? 'active': ''" @click="clickFn('', '', 'k')">K</div>
            <div class="other" :class="initial === 'l' ? 'active': ''" @click="clickFn('', '', 'l')">L</div>
            <div class="other" :class="initial === 'm' ? 'active': ''" @click="clickFn('', '', 'm')">M</div>
            <div class="other" :class="initial === 'n' ? 'active': ''" @click="clickFn('', '', 'n')">N</div>
            <div class="other" :class="initial === 'o' ? 'active': ''" @click="clickFn('', '', 'o')">O</div>
            <div class="other" :class="initial === 'p' ? 'active': ''" @click="clickFn('', '', 'p')">P</div>
            <div class="other" :class="initial === 'q' ? 'active': ''" @click="clickFn('', '', 'q')">Q</div>
            <div class="other" :class="initial === 'r' ? 'active': ''" @click="clickFn('', '', 'r')">R</div>
            <div class="other" :class="initial === 's' ? 'active': ''" @click="clickFn('', '', 's')">S</div>
            <div class="other" :class="initial === 't' ? 'active': ''" @click="clickFn('', '', 't')">T</div>
            <div class="other" :class="initial === 'u' ? 'active': ''" @click="clickFn('', '', 'u')">U</div>
            <div class="other" :class="initial === 'v' ? 'active': ''" @click="clickFn('', '', 'v')">V</div>
            <div class="other" :class="initial === 'w' ? 'active': ''" @click="clickFn('', '', 'w')">W</div>
            <div class="other" :class="initial === 'x' ? 'active': ''" @click="clickFn('', '', 'x')">X</div>
            <div class="other" :class="initial === 'y' ? 'active': ''" @click="clickFn('', '', 'y')">Y</div>
            <div class="other" :class="initial === 'z' ? 'active': ''" @click="clickFn('', '', 'z')">Z</div>
            <div class="other" :class="initial === '0' ? 'active': ''" @click="clickFn('', '', '0')">#</div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="container" v-for="(item,index) in artists" :key="index">
          <div class="img" :style="{background: 'url(' + item.img1v1Url +')', backgroundSize:'cover'}">
          </div>
          <div class="name">
            <div class="username" :title="item.name" @click="singerDetailFn(item.id)">{{item.name}}</div>
            <div class="userInfo" v-if="item.accountId"><el-avatar :size="18" icon="el-icon-user-solid"></el-avatar></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        artists: [],
        initial: '-1', // 热门值
        type: '-1', // 类型
        area: '-1' // 地区
      };
    },
    mounted () {
      // this.getList();
    },
    methods: {
      /**
       * @Description
       * @author wangkangzhang
       * @date 2022/1/26
      */
      clickFn (type,area,initial) {
        this.type = type || this.type;
        this.area = area || this.area;
        this.initial = initial || this.initial;
        this.getList();
      },
      /**
       * @Description 获取信息
       * @author wangkangzhang
       * @date 2022/1/26
      */
      async getList () {
        const { data } = await this.$axios.get('/artist/list', {
          params: {
            type: this.type,
            area: this.area,
            initial: this.initial,
            limit: 30
          },
        });
        if (data.code === 200) {
          this.artists = data.artists;
          console.log(this.artists);
        }
      },
      /**
       * @Description 歌手详情
       * @author wangkangzhang
       * @date 2022/1/27
      */
      singerDetailFn (id) {
        this.$router.push(`/singerDetail?id=${id}`);
      }
    }
  }
</script>

<style lang="less" scoped>
.singer {
  width: 100%;
  /*height: 100%;*/
  background-color: #2b2b2b;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 1100px;
    .top {
      height: 120px;
      .type {
        margin: 10px 0;
        display: flex;
        .title {
          color: #ffffff;
          width: 50px;
          cursor: pointer;
        }
        .all {
          /*color: #ec4141;*/
          cursor: pointer;
          color: #878787;
          width: 50px;
        }
        .other {
          color: #878787;
          cursor: pointer;
          width: 80px;
        }
      }
      .filter {
        display: flex;
        margin: 10px 0;
        .left {
          width: 60px;
          .title {
            color: #ffffff;
            cursor: pointer;
            width: 50px;
            padding: 5px 0;
          }
        }
        .right {
          display: flex;
          flex-flow:wrap;
          .popular {
            color: #878787;
            cursor: pointer;
            width: 50px;
            padding: 5px 0;
          }
          .other {
            color: #878787;
            cursor: pointer;
            width: 50px;
            padding: 5px 0;
          }
        }
      }
    }
    .middle {
      height: calc(100% - 110px);
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      .container {
        height: 190px;
        width: 180px;
        margin: 10px 0;
        .img {
          width: 165px;
          height: 165px;
          display: flex;
          border-radius: 5px;
          justify-content: center;
          background-repeat: no-repeat;
        }
        .name {
          height: 25px;
          width: 165px;
          display: flex;
          position: relative;
          color: white;
          .userInfo {
            height: 25px;
            width: 25px;
            justify-content: flex-end;
            align-items: center;
            display: flex;
            cursor: pointer;
            .el-avatar {
              background-color: #ec4141;
            }
          }
          .username {
            width: calc(100% - 25px);
            cursor: pointer;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow:ellipsis;
          }
        }
      }
    }
  }
  .active {
    color: #ec4141 !important;
  }
}
</style>
