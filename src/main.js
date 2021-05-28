import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import validate from '@/utils/validate';
import './assets/Icon/iconfont.css'
import './common/stylesheet/index.less';
Vue.config.productionTip = false;
Vue.prototype.$validate = validate;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
