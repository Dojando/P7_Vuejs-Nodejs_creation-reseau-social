import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../views/auth.vue'
import ArticleList from '../views/ArticleList.vue'
import PageCompte from '../views/Compte.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: auth
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: ArticleList
  },
  {
    path: '/Compte',
    name: 'Compte',
    component: PageCompte
  },
]

const router = new VueRouter({
  routes
})

export default router
