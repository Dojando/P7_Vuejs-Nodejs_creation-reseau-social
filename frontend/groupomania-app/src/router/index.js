import Vue from 'vue'
import VueRouter from 'vue-router'
import connexion from '../views/Connexion.vue'
import inscription from '../views/Inscription.vue'
import ArticleList from '../views/ArticleList.vue'
import PageCompte from '../views/Compte.vue'
import CreationArticle from '../views/CreateArticle.vue'
import LireArticle from '../views/ReadArticle.vue'
import UserActivity from '../views/UserActivity.vue'
import Signalement from '../views/Signalement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/connexion',
    name: 'Connexion',
    component: connexion
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: inscription
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: ArticleList
  },
  {
    path: '/compte',
    name: 'Compte',
    component: PageCompte
  },
  {
    path: '/creation',
    name: 'CreationArticle',
    component: CreationArticle
  },
  {
    path: '/article/:id',
    name: 'LireArticle',
    component: LireArticle
  },
  {
    path: '/utilisateur/:id',
    name: 'UserActivity',
    component: UserActivity
  },
  {
    path: '/signalement',
    name: 'Signalement',
    component: Signalement
  },
]

const router = new VueRouter({
  routes
})

export default router
