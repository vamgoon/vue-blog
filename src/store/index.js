/**
 * Created by vamgoon on 2017/5/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    headerContents: {
      home: { title: '首页',
        words: '--世界上本没有路，走的人多了，就成了路'
      },
      front: {
        title: '前端',
        words: '--世界上本没有路，走的人多了，就成了路'
      },
      about: {
        title: '关于，我',
        words: '--Life is so long'
      },
      content: {
        title: '',
        words: ''
      },
      dashboard: {
        title: ''
      }
    },
    headerContent: {
      title: '首页',
      words: '--越走越远，越来越明'
    },
    isHeaderShow: true,
    article: {
      title: '',
      content: '',
      abstract: '',
      author: '',
      subTime: '',
      tags: '',
      imgSrc: ''
    }
  },
  getters,
  actions,
  mutations
})
