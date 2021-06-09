import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由整合
Vue.use(VueRouter)

// 导入对应的路由
import Aside from '../components/Aside/index'
import carousel from '../components/carousel'
import latestMusic from '../components/latestMusic/index'
// import mainContent from '../components/mainContent/index'
import header from '../components/music-header'
import playListDetail from '../components/playListDetail/index'
import radioStation from '../components/radioStation/index'
import rankingList from '../components/rankingList/index'
import recommend from '../components/recommend/index'
import singer from '../components/singer/index'
import songDetail from '../components/songDetail/index'
import songSheet from '../components/songSheet/index'
import mainContent from '../components/mainContent/index';
import musicFooter from '../components/musicFooter/index';

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: mainContent
    },
    {
      //
      path: '/Aside',
      component: Aside
    },
    {
      //
      path: '/latestMusic',
      component: latestMusic
    },
    {
      //
      path: '/mainContent',
      component: mainContent
    },
    {
      //
      path: '/playListDetail',
      component: playListDetail
    },
    {
      //
      path: '/radioStation',
      component: radioStation
    },
    //
    {
      path: '/rankingList',
      component: rankingList
    },
    //
    {
      path: '/recommend',
      component: recommend
    },
    //
    {
      path: '/singer',
      component: singer
    },
    //
    {
      path: '/songDetail',
      component: songDetail
    },//
    {
      path: '/songSheet',
      component: songSheet
    },//
    {
      path: '/musicFooter',
      component: musicFooter
    },
  ],
})

export default router
