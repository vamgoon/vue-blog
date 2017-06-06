import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import home from '@/components/front/home'
import front from '@/components/front/front'
import dashboard from '@/components/dashboard/index'
import db from '@/components/dashboard/db'
import wArticle from '@/components/dashboard/wArticle'
import editArticle from '@/components/dashboard/editArticle'
import content from '@/components/front/content'
import dbList from '@/components/dashboard/list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',
      component: main,
      children: [
        { path: '', name: 'home', component: home },
        { path: '/front', name: 'front', component: front },
        { path: '/content/:id', name: 'content', component: content },
        { path: '/node', name: 'node', component: home },
        { path: '/about', name: 'about', component: home }
      ]
    },
    {
      path: '/dashboard',
      component: dashboard,
      children: [
        {path: '', name: 'db', component: db},
        {path: 'list', name: 'dbList', component: dbList},
        {path: 'wArticle', name: 'writeArticle', component: wArticle},
        {path: 'editArticle', name: 'editArticle', component: editArticle}
      ]
    }
  ]
})
