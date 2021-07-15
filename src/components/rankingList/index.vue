<template>
  <div class="container">
    <span class="title">官方榜</span>
    <div class="ranking">
      <div class="coverImg">
        <div v-for="(item,index) in rankingList" :key="index">
          <div class="cover" v-if="index < 4" :style="{background: 'url(' + item.coverImgUrl +')', backgroundSize:'contain'}">
            <div class="playBtn">
              <div class="icon">
                <i class="el-icon-caret-right"></i>
              </div>
              <div class="updateTime">{{item.updateTime}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table">
        <div style="height: 210px;margin-bottom: 10px">
          <el-table
              v-loading="soaringListLoading"
              @cell-dblclick="cellDblclick"
              :data="soaringList"
              :show-header="false"
              stripe
              size="mini"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="歌曲"
                show-overflow-tooltip
                min-width="60%">
            </el-table-column>
            <el-table-column
                prop="singer"
                label="歌手"
                align="right"
                show-overflow-tooltip
                min-width="30%">
              <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ar" :key="index">
                <span>{{item.name}}</span>
                <span v-if="scope.row.ar.length-1 > index"> / &nbsp;&nbsp;</span>
              </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="showAll" v-if="soaringList.length > 0" @click="clickFn(0)">
            查看全部 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div style="height: 210px;margin-bottom: 10px">
          <el-table
              v-loading="newListLoading"
              @cell-dblclick="cellDblclick"
              :data="newList"
              :show-header="false"
              stripe
              size="mini"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="歌曲"
                show-overflow-tooltip
                min-width="60%">
            </el-table-column>
            <el-table-column
                prop="singer"
                label="歌手"
                align="right"
                show-overflow-tooltip
                min-width="30%">
              <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ar" :key="index">
                <span>{{item.name}}</span>
                <span v-if="scope.row.ar.length-1 > index"> / &nbsp;&nbsp;</span>
              </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="showAll" v-if="newList.length > 0" @click="clickFn(1)">
            查看全部 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div style="height: 210px;margin-bottom: 10px">
          <el-table
              v-loading="originalListLoading"
              @cell-dblclick="cellDblclick"
              :data="originalList"
              :show-header="false"
              stripe
              size="mini"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="歌曲"
                show-overflow-tooltip
                min-width="60%">
            </el-table-column>
            <el-table-column
                prop="singer"
                label="歌手"
                align="right"
                show-overflow-tooltip
                min-width="30%">
              <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ar" :key="index">
                <span>{{item.name}}</span>
                <span v-if="scope.row.ar.length-1 > index"> / &nbsp;&nbsp;</span>
              </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="showAll" v-if="originalList.length > 0" @click="clickFn(2)">
            查看全部 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div style="height: 210px;">
          <el-table
              v-loading="hotListLoading"
              @cell-dblclick="cellDblclick"
              :data="hotList"
              :show-header="false"
              stripe
              size="mini"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="歌曲"
                show-overflow-tooltip
                min-width="60%">
            </el-table-column>
            <el-table-column
                prop="singer"
                label="歌手"
                align="right"
                show-overflow-tooltip
                min-width="30%">
              <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ar" :key="index">
                <span>{{item.name}}</span>
                <span v-if="scope.row.ar.length-1 > index"> / &nbsp;&nbsp;</span>
              </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="showAll" v-if="hotList.length > 0" @click="clickFn(3)">
            查看全部 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking">
      <div class="coverImg">
        <div class="cover">
          <img :src="artistTopList.coverUrl" alt="">
          <div class="time">{{update}}更新</div>
        </div>
      </div>
      <div class="table">
        <div style="height: 210px;margin-bottom: 10px">
          <el-table
              v-loading="artistLoading"
              :data="artist"
              :show-header="false"
              stripe
              size="mini"
              style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="歌曲"
                show-overflow-tooltip
                min-width="60%">
            </el-table-column>
          </el-table>
          <div class="showAll" v-if="artist.length > 0" @click="handleClickFn">
            查看全部 <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="title">全球榜</div>
    <div class="allRanking">
      <div class="coverImg" v-for="(item,index) in allRankingList" :key="index">
        <div class="content" :style="{background: 'url(' + item.coverImgUrl +')', backgroundSize:'cover'}"  @click="listDetail(item.id)">
          <div class="playCount">
            <i class="el-icon-caret-right"></i>
            <span v-if="item.playCount < 10000">{{item.playCount}}</span>
            <span v-else>{{Math.round(item.playCount/10000)}}万</span>
          </div>
          <div class="btn">
            <i class="el-icon-caret-right"></i>
          </div>
        </div>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import cloudMusicRanking from '../cloudMusicRanking';
  export default {
    name: "index",
    components: {
      cloudMusicRanking
    },
    data () {
      return {
        tableData: [],
        rankingList: [],
        allRankingList: [],
        soaringList: [],
        newList: [],
        originalList: [],
        hotList: [],
        artist: [],
        artistTopList: {},
        soaringListLoading: true,
        newListLoading: true,
        originalListLoading: true,
        hotListLoading: true,
        artistLoading: true,
        update: ''
      };
    },
    mounted () {
      // this.getTopList();
    },
    methods: {
      // 双击播放
      cellDblclick (row, column, cell, event) {
        this.$store.dispatch('getSongUrlFn', row.id);
        this.$store.dispatch('getSongDetailFn', row.id);
        this.$message({
          message: '已添加到播放列表',
          type: 'success'
        });
      },
      /**
       * @Description 获取所有榜单
       * @author wangkangzhang
       * @date 2021/6/1
       */
      async getTopList () {
        const { data } = await this.$axios.get('/toplist');
        if (data.code === 200) {
          this.rankingList = data.list;
          this.allRankingList = data.list.slice(4);
          this.artistTopList = data.artistToplist;
          const date = new Date();
          const months = date.getMonth() + 1;
          const days = date.getDate();
          this.update = months +  '月' + days + '日';
          this.getSoaringList();
          this.getNewList();
          this.getOriginalList();
          this.getHotList();
          this.getArtist();
          for (const key of this.rankingList) {
            key.updateTime = this.changeFormatTimeFn(key.updateTime);

          }
        }
      },
      changeFormatTimeFn (time) {
        let date = new Date(time);
        let month = date.getMonth() + 1;
        let days = date.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (days < 10) {
          days = '0' + days
        }
        return month + '月' + days + '日 ' + '更新';
      },
      // 获取飙升榜详情
      async getSoaringList () {
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: this.rankingList[0].id
          },
        });
        if (data.code === 200) {
          this.soaringList = data.playlist.tracks.slice(0,5);
          this.soaringListLoading = false;
        }
      },
      // 获取新歌榜详情
      async getNewList () {
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: this.rankingList[1].id
          },
        });
        if (data.code === 200) {
          this.newList = data.playlist.tracks.slice(0,5);
          this.newListLoading = false;
        }
      },
      // 获取原创榜详情
      async getOriginalList () {
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: this.rankingList[2].id
          },
        });
        if (data.code === 200) {
          this.originalList = data.playlist.tracks.slice(0,5);
          this.originalListLoading = false;
        }
      },
      // 获取热榜详情
      async getHotList () {
        const { data } = await this.$axios.get('/playlist/detail', {
          params: {
            // 获取的数据量
            id: this.rankingList[3].id
          },
        });
        if (data.code === 200) {
          this.hotList = data.playlist.tracks.slice(0,5);
          this.hotListLoading = false;
        }
      },
      // 获取歌手榜单信息
      async getArtist () {
        const { data } = await this.$axios.get('/toplist/artist');
        if (data.code === 200) {
          this.artist = data.list.artists.slice(0,5);
          this.artistLoading = false;
        }
      },
      // 点击查看全部触发
      clickFn (val) {
        this.$router.push(`/playListDetail?id=${this.rankingList[val].id}`);
      },
      // 歌手榜点击查看全部触发
      handleClickFn () {
        this.$router.push(`/cloudMusicRanking`);
      },
      listDetail (id) {
        this.$router.push(`/playListDetail?id=${id}`);
      }
    }
  }
</script>

<style lang="less" scoped>
.container {
  padding: 10px 60px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .ranking {
    margin-top: 10px;
    display: flex;
    position: relative;
    .coverImg {
      .cover {
        width: 170px;
        height: 170px;
        line-height: 170px;
        border-radius: 5px;
        margin-bottom: 50px;
        display: flex;
        align-items: center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        .playBtn {
          height: 100px;
          line-height: 100px;
          text-align: center;
          .icon {
            visibility: hidden;
            height: 70px;
          }
          &:hover .icon {
            visibility: visible;
            width: 100px;
            height: 50px;
            line-height: 50px;
            margin-top: 20px;
            i {
              width: 40px;
              height: 40px;
              line-height: 40px;
              border-radius: 20px;
              background-color: white;
              font-size: 24px;
              color: #ec4141;
              opacity: 0.6;
            }
          }
          .updateTime {
            font-size: 12px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
          }
        }
        .time {
          position: absolute;
          margin-top: 60px;
          color: #FFFFFF;
          font-size: 12px;
        }
      }
      img {
        border-radius: 5px;
        width: 170px;
        height: 170px;
      }
    }
    .table {
      margin-left: 30px;
      width: calc(100% - 235px);
      .showAll {
        margin: 5px 0;
        cursor: pointer;
      }
      margin-bottom: 20px;
    }
  }
  .allRanking {
    .coverImg {
      float: left;
      /*display: flex;*/
      padding: 12px 15px 12px 0;
      /*position: relative;*/
      .content {
        width: 200px;
        /*float: left;*/
        border-radius: 5px;
        height: 200px;
        /*line-height: 210px;*/
        align-items: center;/*垂直居中*/
        justify-content: center;/*水平居中*/
        text-align: center;
        position: relative;
        .playCount {
          position: absolute;
          margin: 5px;
          right: 0;
          top: 0;
          height: 20px;
          /*width: 100px;*/
          color: #FFFFFF;
          i {
            padding-right: 10px;
          }
        }
        .btn {
          line-height: 210px;
          i {
            visibility: hidden;
          }
          &:hover i {
            visibility: visible;
            background-color: #FFFFFF;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            opacity: 0.8;
            font-size: 26px;
            color: #ec4141;
          }
        }
      }
    }
  }
}
</style>
