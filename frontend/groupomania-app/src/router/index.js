import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../views/auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: auth
  },
]

const router = new VueRouter({
  routes
})

export default router
