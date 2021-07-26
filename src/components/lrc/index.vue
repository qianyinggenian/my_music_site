<template>
<!--  歌词滚动：参考：https://blog.csdn.net/xzwwjl1314/article/details/107186824/-->
  <div class="container">
    <ul ref="lyricUL">
      <li v-for="(item, i) in lyricsObjArr" :style="{color: lyricIndex === i ? '#161616' : '#666666'}" :key="item.uid" :data-index='i' ref="lyric">{{item.lyric}}</li>
    </ul>
  </div>
</template>

<script>
  import 'aplayer/dist/APlayer.min.css';
  // import APlayer from 'aplayer';
  import {mapState} from "vuex";
  export default {
    name: "index",
    data () {
      return {
        lyricsObjArr: [],
        lyricIndex: 0,
        lyric: '',
        currentTime: null
      };
    },
    props: {
      lyric: {
        type: String
      }
    },
   computed: {
     // ...mapState,
     // asd () {
     //   return this.$store.state.lyric;
     // },
     handleCurrentTime () {
       return this.$store.state.currentTime;
     }
    },
    watch: {
      asd: {
        handler (val){
          console.log(123, val);
        }
      },
      handleCurrentTime: {
        handler (val) {
          this.currentTime = val;
          this.fn()
        }
      }
    },
    mounted() {
      console.log('lyric', this.lyric);
      // this.lyric = this.$store.state.lyric;
      this.handleLrc();
      // this.fn();
    },
    methods: {
      handleLrc () {
        const regNewLine = /\n/;
        const lineArr = this.lyric.split(regNewLine); // 每行歌词的数组
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
        lineArr.forEach(item => {
          if (item === '') return;
          const obj = {};
          const time = item.match(regTime);

          obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim();
          obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
          obj.uid = Math.random().toString().slice(-6);
          if (obj.lyric === '') {
            console.log('这一行没有歌词');
          } else {
            this.lyricsObjArr.push(obj);
          }
        });
      },
      formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
        const regMin = /.*:/;
        const regSec = /:.*\./;
        const regMs = /\./;

        const min = parseInt(time.match(regMin)[0].slice(0, 2));
        let sec = parseInt(time.match(regSec)[0].slice(1, 3));
        const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3);
        if (min !== 0) {
          sec += min * 60;
        }
        return Number(sec + '.' + ms);
      },
      fn () {
        for (let i = 0; i < this.lyricsObjArr.length; i++) {
          if (this.currentTime > (parseInt(this.lyricsObjArr[i].time))) {
            const index = this.$refs.lyric[i].dataset.index;
            if (i === parseInt(index)) {
              this.lyricIndex = i;
              this.$refs.lyricUL.style.transform = `translateY(${170 - (30 * (i + 1))}px)`;
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    /*background-color: #ec4141;*/
    justify-items: center;
    text-align: center;
    background: -webkit-linear-gradient(#c6c7d4, #ffffff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#c6c7d4, #ffffff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#c6c7d4, #ffffff); /* Firefox 3.6 - 15 */
    background: linear-gradient(#c6c7d4, #ffffff); /* 标准的语法 */
    ul {
      width: 100%;
      list-style: none;
      text-align: center;
    }
  }
</style>
