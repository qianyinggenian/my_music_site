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
      state.songSrc = value.url;
    },
    songDetailFn(state, value) {
      state.songDetail = value;
      state.squareUrl = value.al.picUrl;
      state.songName = value.name;
      state.singer = value.ar[0].name;
      const params = {
        singer: value.ar[0].name,
        name: value.name,
        id: value.id,
        duration: formatDuration(value.dt)
      };
      // 去重
      state.playList = state.playList.filter(item => item.id !== value.id);
      // 插入到最前面
      state.playList.unshift(params);
    },
    clearPlayList (state) {
      state.playList = [];
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
  },
  // 模块
  modules: {
  }
})
