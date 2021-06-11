<template>
  <div>
    <el-carousel
        :initial-index="initialIndex"
        :interval="interval"
        :trigger="trigger"
        :height="carouselHeight"
        :autoplay="autoplay"
        :type="type"
        :indicator-position="indicatorPosition"
        :arrow="arrow"
        :loop="loop"
        :direction="direction"
        @change="handleChangeFn"
    >
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <div class="carousel" @click="clickFn(item)">
          <img :src=item.imageUrl alt="" height="100%" width="100%">
          <span>{{item.typeTitle}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import playListDetail from "@/components/playListDetail/index";

export default {
  name: "index",
  data () {
    return {
    }
  },
  props: {
    /* 初始状态激活的幻灯片的索引，从 0 开始 */
    initialIndex: {
      type: Number,
      default: 0
    },
    /* 自动切换的时间间隔，单位为毫秒 */
    interval: {
      type: Number,
      default: 3000
    },
    /* Carousel的高度 */
    carouselHeight: {
      type: String,
      default: '400px'
    },
    /* 指示器的触发方式 */
    trigger: {
      type: String
    },
    /* 是否自动切换,默认是 */
    autoplay: {
      type: Boolean,
      default: true
    },
    /* 	指示器的位置, 默认在内部，可选值有outside/none */
    indicatorPosition: {
      type: String
    },
    /* 切换箭头的显示时机,默认值hover，可选值always/hover/never */
    arrow: {
      type: String,
      default: 'hover'
    },
    /* 走马灯的类型,默认为一般形式，可选值card */
    type: {
      type: String
    },
    /* 是否循环显示,默认是 */
    loop: {
      type: Boolean,
      default: true
    },
    /* 走马灯展示的方向,可选值horizontal/vertical */
    direction: {
      type: String,
      default: 'horizontal'
    },
    imgList: {
      type: Array
    }
  },
  created() {
  },
  methods: {
    handleChangeFn (val) {
      // console.log('val', val);
    },
    clickFn (index) {
      if (index.targetType === 1) {
        const params = {
          encodeId: index.encodeId,
          targetType: index.targetType
        };
        this.$router.push(`/musicFooter?encodeId=${index.encodeId}&targetType=${index.targetType}&path=${this.$route.path}`);
      } else if (index.targetType === 10) {
        const params = JSON.stringify(index);
        this.$router.push({
          path: '/playListDetail',
          component: playListDetail,
          query: {res: params }
        });
      } else if (index.targetType === 3000) {
        window.open(`${index.url}`,'_blank');
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .carousel {
    /*margin: 0 60px;*/
    position: relative;
    img {
      border-radius: 10px;
    }
    span {
      background-color: #ec4141;
      /*width: 80px;*/
      height: 20px;
      text-align: center;
      position: absolute;
      bottom: 0;
      /*top: 0;*/
      right: 0;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
      color: #ffffff;
      padding: 3px;
      margin-bottom: 4px;
    }
  }
</style>
