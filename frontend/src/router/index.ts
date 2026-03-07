import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/layouts/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard/Index.vue'),
        },
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      component: () => import('@/layouts/Auth.vue'),
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: '/auth/login',
          name: 'Admin Login',
          component: () => import('@/views/Auth/Login.vue'),
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ]
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({
      path: '/auth/login',
      replace: true
    })

    return
  }

  if (to.path === '/auth/login' && token) {
    next({
      path: '',
      replace: true
    })

    return
  }

  next()
})

export default router