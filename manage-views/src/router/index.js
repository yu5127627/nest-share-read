import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('@/views/welcome/home'),
        meta: { title: '主页', icon: 'home', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/bookmanage',
    component: Layout,
    redirect: '/bookmanage/category',
    name: 'bookmanage',
    meta: { title: '藏书管理', icon: 'booksmanage', roles: ['admin'] },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/bookmanage/category'),
        meta: { title: '类别管理', icon: 'category' }
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/bookmanage/book'),
        meta: { title: '图书管理', icon: 'book' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/usermanage/index'),
        meta: { title: '用户管理', icon: 'site', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    alwaysShow: true,
    meta: { title: '系统设置', icon: 'site', roles: ['admin'] },
    children: [
      {
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/site/manager'),
        meta: { title: '管理员列表', icon: 'site', roles: ['admin'] }
      },
      {
        path: 'app',
        name: 'app',
        component: () => import('@/views/site/app'),
        meta: { title: 'app版本管理', icon: 'site', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/github',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'github', icon: 'github', roles: ['admin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
