/**
 * Created by Vamgoon on 2017/5/3.
 */
import axios from 'axios'
export default {
  setHeaderContent ({state, commit}, pathName) {
    commit('SET_HEADERCONTENT', state.headerContents[pathName])
  },
  getArticles ({ state, commit }) {
    axios.get('/api/getArticles')
      .then(res => {
        commit('GET_ARTICLES', res.data.reverse())
      })
  },
  getArticle ({ state, commit }, id) {
    let article
    for (let item of state.articles) {
      if (item.id === id) {
        article = item
        break
      }
    }
    commit('GET_ARTICLE', article)
  },
  setArticle ({state, commit}, article) {
    return axios.post('/api/setArticle', article)
      .then(res => res.data)
  },
  deleteArticle ({state, commit}, article) {
    return axios.post('/api/deleteArticle', article)
      .then(res => res.data)
  }
}
