<template>
  <article class="col-lg-6 col-lg-offset-3">

  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  mounted () {
    this.getArticle(this.$route.params.id).then(() => {
      this.$store.state.headerContents.content.title = this.article.title
      document.querySelector('article').innerHTML = this.article.content
    })
  },
  methods: {
    ...mapActions(['getArticle'])
  },
  name: 'content',
  computed: {
    ...mapState(['article'])
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
article {
  border-radius: 8px;
  box-shadow: 0 30px 30px rgb(200, 200, 200);
  padding: 15px 30px;
  margin-top: -40px;
  background: rgb(255, 255, 255);
}
</style>
