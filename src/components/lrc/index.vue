<template>
<!--  <div id="aplayer" class="player">-->
<!--    dsfaer-->
<!--  </div>-->
  <div class="container">

  </div>
</template>

<script>
  import 'aplayer/dist/APlayer.min.css';
  import APlayer from 'aplayer';
  export default {
    name: "index",
    data () {
      return {};
    },
    mounted() {
      // this.handleLrc();
    },
    methods: {
      // handleLrc () {
      //   const ap = new APlayer({
      //     container: document.getElementById('aplayer'),
      //     lrcType: 1,
      //     audio: {
      //       name: '哈哈',
      //       artist: '呵呵',
      //       url: this.$store.state.songSrc,
      //       cover: this.$store.state.squareUrl,
      //       lrc: this.$store.state.lyric
      //     }
      //   });
      // }
    }
  }
</script>

<style lang="less" scoped>
 /* #aplayer {*/
 /*   !*height: 200px;*!*/
 /*   !*width: 100%;*!*/
 /* }*/
 /*.player {*/
 /*  !*height: 200px;*!*/
 /*  !*width: 100%;*!*/
 /*  background: -webkit-linear-gradient(#c6c7d4, #ffffff); !* Safari 5.1 - 6.0 *!*/
 /*  background: -o-linear-gradient(#c6c7d4, #ffffff); !* Opera 11.1 - 12.0 *!*/
 /*  background: -moz-linear-gradient(#c6c7d4, #ffffff); !* Firefox 3.6 - 15 *!*/
 /*  background: linear-gradient(#c6c7d4, #ffffff); !* 标准的语法 *!*/
 /*}*/
 /* /deep/ .aplayer .aplayer-lrc:before{*/
 /*   display: inline !important;*/
 /*   position: relative !important;*/
 /* }*/
 /* /deep/ .aplayer .aplayer-lrc:after {*/
 /* !*, .aplayer .aplayer-lrc:before*!*/
 /*   display: inline !important;*/
 /*   position: relative !important;*/
 /* }*/
 /* /deep/.aplayer-lrc {*/
 /*   height: 500px !important;*/
 /* }*/
 /* /deep/ .aplayer-info {*/
 /*   height: 600px !important;*/
 /* }*/
  .container {

  }
</style>
<style>
  /*.aplayer .aplayer-lrc:after, .aplayer .aplayer-lrc:before{*/
  /*  display: inline !important;*/
  /*  position: relative !important;*/
  /*}*/
  /*.aplayer .aplayer-lrc .aplayer-lrc-current {*/
  /*  color: #ec4141;*/
  /*}*/
</style>
