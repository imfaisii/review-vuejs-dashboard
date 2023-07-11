import env from '@/constants/env'
import { authMiddleware } from '@/middlewares/auth'
import { capitalizeFirstLetter, getLastSegment } from '@/utils/useString'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const APP_NAME = env.VITE_APP_NAME

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes: [...setupLayouts(routes)],
})

// Page Title and Metadata
router.beforeEach((to: any, from, next) => {
  document.title = capitalizeFirstLetter(getLastSegment(to.path)) + ' - ' + APP_NAME

  authMiddleware(to, from, next)
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
