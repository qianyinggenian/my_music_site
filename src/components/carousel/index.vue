<template>
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
      <img :src=item.imgSrc alt="" height="100%" width="100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      imgList: [
        {
          imgSrc: require('./img/1.jpg')
        }
      ]
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
    }
  },
  created() {
    this.addImgListFn();
  },
  methods: {
    addImgListFn () {
      for (let i = 1; i < 10; i++) {
        this.imgList.push({
          imgSrc: require(`./img/${i}.jpg`)
        });
      }
    },
    handleChangeFn (val) {
      // console.log('val', val);
    }
  }
}
</script>

<style scoped>

</style>
