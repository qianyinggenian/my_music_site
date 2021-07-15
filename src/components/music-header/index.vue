<template>
  <div class="header">
    <!-- logo开始-->
    <div class="logo">
      <i class="icon iconfont icon-guanjianci"></i>
      我的音乐
    </div>
    <!-- logo结束-->
    <!-- 搜索部分开始-->
    <div class="search">
      <div class="btn">
        <span class="el-icon-arrow-left left" @click="prev"></span>
        <span class="el-icon-arrow-right right"  @click="back"></span>
      </div>
      <div class="search-box">
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="small"
            @focus="focusFn"
            @blur="blurFn"
            @keyup.enter.native="getCloudSearch"
            v-model="searchValue">
        </el-input>
        <el-popover
            placement="bottom"
            width="400"
            trigger="manual"
            v-model="visible">
          <div style="width: 400px">
            <div v-if="showList" class="searchHistory">
              <div>搜索历史 <i class="el-icon-delete" @click="handleDelete"></i></div>
              <div class="historicalContent">
                <div class="content"
                     :ref="`label${index}`"
                     @mouseover="mouseOver(`label${index}`, 'icon')"
                     @mouseleave="mouseLeave(`label${index}`,'icon')"
                     v-for="(item, index) in history" :key="index">
                    <span>{{item.value}}</span>
                    <i class="el-icon-close" style="height: 22px;line-height: 22px" @click="handleDelete(item.id)"></i>
                </div>
              </div>
            </div>
            <div v-if="showList" class="hotSearchList">
              热搜榜
              <div class="searchList"
                   :ref="`list${index}`"
                   @mouseover="mouseOver(`list${index}`)"
                   @mouseleave="mouseLeave(`list${index}`)"
                   v-for="(item, index) in detailList">
                <div class="list-left">{{index + 1}}</div>
                <div class="list-right">
                  <div class="list-searchWord">
                    <span class="searchWord">{{item.searchWord}}</span>
                    <i v-if="item.iconType === 5" class="el-icon-top"></i>
                    <span class="score">{{item.score}}</span>
                  </div>
                  <div class="list-content" :title="item.content">
                    {{item.content}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showResult" class="searchResult">
              <div style="margin-bottom: 5px">搜“<span style="color: #56A2E8;">{{searchValue}}</span>”相关结果 <i class="el-icon-arrow-right"></i></div>
              <!--单曲开始-->
              <div v-if="songs.length > 0" class="result-title"> <i class="icon iconfont icon-yinle1"></i>单曲</div>
              <div class="searchResultList"
                   v-if="songs.length > 0"
                   :ref="`songs${index}`"
                   @mouseover="mouseOver(`songs${index}`)"
                   @mouseleave="mouseLeave(`songs${index}`)"
                   v-for="(item, index) in songs">
                <div class="result-list-left">{{index + 1}}</div>
                <div class="result-list-right">
                  <div class="result-content">
                    <span class="searchWord">{{item.name}}</span>
                    <span style="padding: 0 5px">-</span>
                    <span class="name" v-for="(val, key) in item.artists">{{val.name}}</span>
                  </div>
                </div>
              </div>
              <!--单曲结束-->
              <!--歌手开始-->
              <div v-if="artists.length > 0" class="result-title"> <i class="el-icon-user"></i>歌手</div>
              <div class="searchResultList"
                   v-if="artists.length > 0"
                   :ref="`artists${index}`"
                   @mouseover="mouseOver(`artists${index}`)"
                   @mouseleave="mouseLeave(`artists${index}`)"
                   v-for="(item, index) in artists">
                <div class="result-list-left">{{index + 1}}</div>
                <div class="result-list-right">
                  <div class="result-content">
                    <span class="searchWord">{{item.name}}</span>
                  </div>
                </div>
              </div>
              <!--歌手结束-->
              <!--专辑开始-->
              <div v-if="albums.length > 0" class="result-title"> <i class="icon iconfont icon-zhuanjiguangpan"></i>专辑</div>
              <div class="searchResultList"
                   v-if="albums.length > 0"
                   :ref="`albums${index}`"
                   @mouseover="mouseOver(`albums${index}`)"
                   @mouseleave="mouseLeave(`albums${index}`)"
                   v-for="(item, index) in albums">
                <div class="result-list-left">{{index + 1}}</div>
                <div class="result-list-right">
                  <div class="result-content">
<!--                    {{item.name}}-->
                    <span class="searchWord">{{item.name}}</span>
                    <span style="padding: 0 5px">-</span>
                    <span class="name">{{item.artist.name}}</span>
                  </div>
                </div>
              </div>
              <!--专辑结束-->
              <!--歌单开始-->
              <div v-if="playlists.length > 0" class="result-title"> <i class="icon iconfont icon-gedan"></i>歌单</div>
              <div class="searchResultList"
                   v-if="playlists.length > 0"
                   :ref="`playlists${index}`"
                   @mouseover="mouseOver(`playlists${index}`)"
                   @mouseleave="mouseLeave(`playlists${index}`)"
                   v-for="(item, index) in playlists">
                <div class="result-list-left">{{index + 1}}</div>
                <div class="result-list-right">
                  <div class="result-content">
                    <span class="searchWord">{{item.name}}</span>
                  </div>
                </div>
              </div>
              <!--歌单结束-->
            </div>
          </div>
        </el-popover>
      </div>
      <div class="maikefeng">
        <span class="icon iconfont icon-maikefeng"></span>
      </div>
    </div>
    <!-- 搜索部分结束-->
<!--    <div class="empty"></div>-->
    <div class="setting">
      <div>
        <el-avatar class="user"> user </el-avatar>
      </div>
      <div class="username">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          未登录<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
      <div class="VIP">
        开通VIP
      </div>
      <div class="">
        <i class="icon iconfont icon-pifu icon"></i>
        <i class="el-icon-setting icon"></i>
        <i class="el-icon-message icon"></i>
        <el-divider direction="vertical"></el-divider>
        <i class="icon iconfont icon-zuixiaohua"></i>
        <i class="icon iconfont icon-zuixiaohua_huaban1"></i>
        <i class="icon iconfont icon-zuidahua"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { randomID } from '@/utils/util'
  export default {
    name: "index",
    data () {
      return {
        searchValue: '',
        visible: false,
        detailList: [],
        active: "",
        showList: true,
        showResult: false,
        searchSuggest: {},
        songs: [], // 歌曲
        artists: [], // 歌手
        playlists: [], // 歌单
        albums: [], // 专辑
        history: [],
        searchHistory: [] // 搜索历史
      };
    },
    watch: {
      searchValue: {
        handler (val) {
          if (val.length === 0) {
            this.showList = true;
            this.showResult = false;
            this.history = JSON.parse(localStorage.getItem('searchHistory'));
          } else {
            this.showList = false;
            this.showResult = true;
            this.getSearchSuggest();
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      // 返回上一步
      prev () {
        this.$router.go(-1);
      },
      // 后退一步
      back () {
        this.$router.go(1);
      },
      // 搜索框获得焦点
      focusFn () {
        this.visible = true;
        this.history = JSON.parse(localStorage.getItem('searchHistory'));
        this.getSearchHot();
        this.getSearchHotDetail();
      },
      // 移入
      mouseOver(index, val) {
        const list = this.$refs[index];
        list[0].style.backgroundColor = "#f3f3f3";
        if (val && val === 'icon') {
          list[0].children[1].style.display = 'block';
        }
      },
      // 移出
      mouseLeave(index,val) {
        const list = this.$refs[index];
        list[0].style.backgroundColor = "";
        if (val && val === 'icon') {
          list[0].children[1].style.display = 'none';
        }
      },
      // 搜索框失去焦点
      blurFn () {
        // this.visible = false;
      },
      // 搜索
      async getCloudSearch () {
        const params = {
          value: this.searchValue,
          id: randomID()
        };
        this.searchHistory.push(params);
        localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory));
        const { data } = await this.$axios.get('/cloudsearch', {
          params: {
            // 获取的数据量
            keywords: this.searchValue
          },
        });
        if (data.code === 200) {
        }
      },
      //默认搜索关键词
      async getSearchDefault () {
        const { data } = await this.$axios.get('/search/default');
        if (data.code === 200) {
        }
      },
      //热搜列表(简略)
      async getSearchHot () {
        const { data } = await this.$axios.get('/search/hot');
        if (data.code === 200) {
        }
      },
      //热搜列表(详细)
      async getSearchHotDetail () {
        const { data } = await this.$axios.get('/search/hot/detail');
        if (data.code === 200) {
          this.detailList = data.data;
        }
      },
      //搜索建议
      async getSearchSuggest () {
        const { data } = await this.$axios.get('/search/suggest', {
          params: {
            // 获取的数据量
            keywords: this.searchValue
          },
        });
        if (data.code === 200) {
          this.searchSuggest = data.result ? data.result : this.searchSuggest;
          // this.showResult = !!data.result;
          this.songs = data.result.songs ? data.result.songs : this.songs;
          this.artists = data.result.artists ? data.result.artists : this.artists;
          this.playlists = data.result.playlists ? data.result.playlists : this.playlists;
          this.albums = data.result.albums ? data.result.albums : this.albums;
        }
      },
      //搜索多重匹配
      async getSearchMultiMatch () {
        const { data } = await this.$axios.get('/search/multimatch', {
          params: {
            // 获取的数据量
            keywords: this.searchValue
          },
        });
        if (data.code === 200) {
        }
      },
      // 删除搜索历史
      handleDelete (id) {
        if (id) {

        } else {
          localStorage.removeItem("searchHistory");
          this.history = [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    color: #ffffff;
    display: flex;
    width: 100%;
    .logo {
      font-size: 20px;
      width: 200px;
    }
    .search {
      width: calc(100% - 600px);
      display: flex;
      .left, .right {
        margin-right: 15px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        color: red;
        border-radius: 10px;
        background: #ffffff;
        filter:alpha(opacity=50);
        -moz-opacity:0.5;
        -khtml-opacity: 0.5;
        opacity: 0.5;
      }
      .search-box {
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 20px;
          opacity: 0.5;
        }
      }
      .maikefeng {
        padding-left: 10px;
      }
    }
    /*.empty {*/
    /*  width: calc(100% - 905px);*/
    /*}*/
    .setting {
      /*justify-content: flex-end;*/
      right: 0;
      display: flex;
      /*float: right;*/
      width: 400px;
      .user {
        display: inline-flex;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background: #C0C4CC;
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        flex-direction: column;
      }
      .username {
        padding-left: 5px;
        .el-dropdown {
          color: #fff;
          /deep/ .el-icon-arrow-down:before {
            content: "\e790" !important;
          }
        }
      }
      .VIP {
        font-size: 14px;
        padding-left: 5px;
      }
      .icon {
        padding: 10px;
      }
    }
    .searchHistory {
      margin-bottom: 10px;
      .historicalContent {
        margin-top: 10px;
        display: flex;
        width: 100%;
        .content {
          border-radius: 20px;
          border: 1px solid #d8d8d8;
          padding: 0 10px;
          font-size: 16px;
          margin: 0 5px;
          text-align: center;
          display: flex;
          justify-content: center;
          justify-items: center;
        }
        i {
          display: none;
        }
        /*&:hover .content i {*/
        /*    display: block;*/
        /*    height: 22px;*/
        /*    line-height: 22px;*/
        /*  }*/
      }
    }
    .hotSearchList {
      height: 400px;
      overflow-y: auto;
      .searchList {
        display: flex;
        width: 100%;
        margin: 10px 0;
        padding: 5px 0;
        .list-left {
          width: 30px;
          line-height: 30px;
          height: 30px;
          text-align: center;
        }
        .list-right {
          width: calc(100% - 30px);
          .list-searchWord {
            .score {
              padding: 10px;
              color: #929292;
              font-size: 12px;
            }
            .searchWord {
            }
            i {
              color: #ec4141;
              padding: 0 10px;
              font-weight: bold;
            }
          }
          .list-content {
            width: 350px;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow:ellipsis;
            color: #929292;
            font-size: 12px;
          }
        }
      }
    }
    .searchResult {
      height: 400px;
      overflow-y: auto;
      .result-title {
        background-color: #f5f5f7;
      }
      .searchResultList {
        display: flex;
        width: 100%;
        margin: 5px 0;
        padding: 5px 0;
        .result-list-left {
          width: 30px;
          /*line-height: 30px;*/
          /*height: 30px;*/
          text-align: center;
        }
        .result-list-right {
          width: calc(100% - 30px);
          .result-content {
            .name {
              padding: 10px;
              color: #929292;
              font-size: 12px;
            }
            .searchWord {
              color: #56A2E8;
            }
          }
        }
      }
    }
   /deep/ .el-input__inner:focus {
      border-color: #ec4141 !important;
      outline: 0;
    }
  }
</style>
