import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  // data
  state: {
    drawer: false,
    playList: {},
    songs: [],
    squareUrl: '', // 歌曲图片来源
    songName: '', // 歌曲名称
    singer: '', // 歌手
    songDetail: {},
    songSrc: '' // 歌曲来源
  },
  // methods
  mutations: {
    drawerFn (state) {
      state.drawer = !state.drawer;
    },
    playFn (state, value) {
      state.playList = value;
      console.log('playList', state.playList);
      state.songSrc = value.url;
    },
    songDetailFn(state, value) {
      state.songDetail = value;
      console.log('songDetail', state.songDetail);
      state.squareUrl = value.al.picUrl;
      state.songName = value.name;
      state.singer = value.ar[0].name;
    }
  },
  // 异步方法
  actions: {
    // 获取歌曲Url
    getSongUrlFn (content,id) {
      return new Promise((resolve, reject) => {
        axios.get(`/song/url?id=${id}`).then(res => {
          resolve(res);
          console.log('urlRes', res.data.data);
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
          console.log('urlRes2', res);
          content.commit('songDetailFn', res.data.songs[0]);
        }, reason => {
          reject(reason);
        })
      })
    },
  },
  // 模块
  modules: {
  }
})
