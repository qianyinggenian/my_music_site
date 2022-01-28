import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {formatDuration} from '@/utils/util'
Vue.use(Vuex);

export default new Vuex.Store({
  // data
  state: {
    drawer: false,
    playList: [], // 当前播放列表
    songs: [],
    squareUrl: '', // 歌曲封面来源
    songName: '', // 歌曲名称
    singer: '', // 歌手
    songDetail: {},
    songId: '',
    songCount: 0,
    searchValue: '',
    lyric: '', // 歌词
    currentTime: null,
    songSrc: '' // 歌曲来源
  },
  getters: {
    getLyric (state) {
      return state.lyric
    }
  },
  // methods
  mutations: {
    drawerFn (state) {
      state.drawer = !state.drawer;
    },
    playFn (state, value) {
      state.songSrc = value.url;
    },
    songDetailFn(state, value) {
      state.songDetail = value;
      state.squareUrl = value.al.picUrl;
      state.songName = value.name;
      state.singer = value.ar[0].name;
      state.songId = value.id;
      const params = {
        singer: value.ar[0].name,
        name: value.name,
        id: value.id,
        squareUrl: state.squareUrl,
        songSrc: state.songSrc,
        duration: formatDuration(value.dt)
      };
      // 去重
      state.playList = state.playList.filter(item => item.id !== value.id);
      // 插入到最前面
      state.playList.unshift(params);
    },
    // 清空列表
    clearPlayList (state) {
      state.playList = [];
    },
     // 歌曲切换
    handleSwitch (state, val) {
      state.squareUrl = val.squareUrl;
      state.songName = val.name;
      state.singer = val.singer;
      state.songId = val.id;
      state.songSrc = val.songSrc;
    },
    handleLyric (state, val) {
      state.lyric = val;
    },
    handleCurrentTime (state, val) {
      state.currentTime = val;
      // console.log('val1111', val);
    }
  },
  // 异步方法
  actions: {
    // 获取歌曲Url
    getSongUrlFn (content,id) {
      return new Promise((resolve, reject) => {
        axios.get(`/song/url?id=${id}`).then(res => {
          resolve(res);
          content.commit('playFn', res.data.data[0]);
        }, reason => {
          reject(reason);
        })
      })
    },
    // 获取歌曲详细信息
    getSongDetailFn (content,id) {
      return new Promise((resolve, reject) => {
        axios.get(`/song/detail?ids=${id}`).then(res => {
          resolve(res);
          content.commit('songDetailFn', res.data.songs[0]);
        }, reason => {
          reject(reason);
        })
      })
    },
    // 获取歌词
    getMusicLyric(content, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/lyric?id=${id}`).then(res => {
          resolve(res);
          content.commit('handleLyric', res.data.lrc.lyric);
        }, reason => {
          reject(reason)
        })
      })
    },
    // 下载音乐
    downloadMusic (state, params) {
      axios({
        method: 'get',
        // url: `https:/xxx.com${url}`,
        url: params.url,
        // url: 'http://m801.music.126.net/20210723112237/700849b3070ee6585a42a46d9b1409f3/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8708798537/d7df/5b6b/20be/c45ae8acfea229a31cd7bc85ce136669.mp3',
        // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
        responseType: 'blob',
      }).then((res) => {
        if (!res) {
          return
        }
        // 将lob对象转换为域名结合式的url
        let blobUrl = window.URL.createObjectURL(res.data);
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.style.display = 'none';
        link.href = blobUrl;
        // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
        link.download = `${params.name}.mp3`;
        // 自触发click事件
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
    }
  },
  // 模块
  modules: {
  }
})
