<template>
  <main>

  </main>
</template>

<script>

export default {
  mounted () {
    console.log(this.$store.state.articles)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  height: 2000px;
}
</style>
