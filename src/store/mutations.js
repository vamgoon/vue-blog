/**
 * Created by Vamgoon on 2017/5/3.
 */
export default {
  'SET_HEADERCONTENT': (state, pyload) => {
    state.headerContent = pyload
  },
  'GET_ARTICLES': (state, pyload) => {
    state.articles = pyload
  },
  'GET_ARTICLE': (state, article) => {
    state.article = article
  }
}
