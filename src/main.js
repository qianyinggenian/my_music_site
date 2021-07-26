import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import validate from '@/utils/validate';
import './assets/Icon/iconfont.css'
import './common/stylesheet/index.less';
import './axios/index'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: import('./assets/images/error.svg'), //加载失败显示的图片
  loading: require('./assets/images/loadding.svg'), // 加载中显示的图片
  attempt: 3,
  // listenEvents: [ 'scroll' ]
});
// 导入Aplayer
import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: './assets/images/cat.jpg',
  productionTip: true,
});
Vue.config.productionTip = false;
Vue.prototype.$validate = validate;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
