import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: resolve => require(['@/public/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/index',
          component: resolve => require(['@/page/contents/index/index.vue'], resolve),
          meta: { title: '系统首页', }
        },
        {
          path: '/bookList',
          component: resolve => require(['@/page/contents/bookList/index.vue'], resolve),
          meta: { title: '书籍列表' }
        },
        // {
        //   path: '/bookContent',
        //   component: resolve => require(['@/page/contents/bookContent/index.vue'], resolve),
        //   meta: { title: '内容' }
        // },

        {
          path: '/userInfo',
          component: resolve => require(['@/page/contents/userInfo/index.vue'], resolve),
          meta: { title: '用户信息' }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['@/page/contents/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: resolve => require(['@/page/contents/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve => require(['@/page/contents/403.vue'], resolve),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/page/Login.vue'], resolve),
      meta: { title: '登陆' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
