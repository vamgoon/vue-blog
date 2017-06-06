<template>
  <main>
    <dbAside></dbAside>
    <router-view class="col-lg-11"></router-view>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import dbAside from './leftAside.vue'
export default {
  mounted () {
    this.$store.state.isHeaderShow = false
  },
  computed: {
    ...mapState(['isHeaderShow'])
  },
  destroyed () {
    this.$store.state.isHeaderShow = true
  },
  components: {
    dbAside
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
