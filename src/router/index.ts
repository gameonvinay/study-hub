import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SubjectDetailView from '../views/SubjectDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import MCQQuiz from '../components/MCQQuiz.vue'
import Refresher from '../components/Refresher.vue'
import TheoryView from '../components/TheoryView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:subjectId',
    name: 'subject-detail',
    component: SubjectDetailView,
    props: true
  },
  {
    path: '/:subjectId/mcq',
    name: 'mcq-quiz',
    component: MCQQuiz,
    props: true
  },
  {
    path: '/:subjectId/refresher',
    name: 'refresher-detail',
    component: Refresher,
    props: true
  },
  {
    path: '/:subjectId/theory',
    name: 'theory-subject',
    component: TheoryView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0 }
    }
  }
})

export default router
