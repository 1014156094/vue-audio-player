import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/home.vue'),
  },
]

const router = new Router({
  mode: 'history',
  routes,
})

export default router
