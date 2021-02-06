import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/robot',
    name: 'Robot',
    component: () => import('../views/Robot.vue')
  },
  {
    path: '/msg',
    name: 'Msg',
    component: () => import('../views/Msg.vue')
  },
  {
    path: '/schoolMsg',
    name: 'SchoolMsg',
    component: () => import('../views/SchoolMsg.vue')
  },
  {
    path: '/timer',
    name: 'Timer',
    component: () => import('../views/Timer.vue')
  },
  {
    path: '/sendRecord',
    name: 'SendRecord',
    component: () => import('../views/SendRecord.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/shortMsg',
    name: 'ShortMsg',
    component: () => import('../views/ShortMsg.vue')
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
