import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueYoutube from 'vue-youtube'
import VueLoading from 'vuejs-loading-plugin'
import homePage from './components/homePage'
import moviePage from './components/moviePage'
import errorPage from './components/errorPage'

Vue.use(VueYoutube);
Vue.use(VueRouter);
Vue.use(VueLoading, {
  dark: true,
});
Vue.config.productionTip = false


const router = new VueRouter({
  routes: [{
      path: '/',
      component: homePage
    },
    {
      path: '/movie/:id',
      component: moviePage,
      name: 'moviePage'
    },
    {
      path: '*',
      component: errorPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')