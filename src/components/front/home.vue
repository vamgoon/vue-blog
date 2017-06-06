<template>
  <main class="col-lg-6 col-lg-offset-3">
    <transition name="list">
      <ul v-if="show">
        <li v-for="item in articles" :key="item.subTime">
          <article class="panel panel-default">
            <!--<header class="panel-heading">{{ item.title }}</header>-->
            <section class="panel-body" :style="{ 'background-image': 'url(' + item.imgSrc + ')' }">
              <router-link :to="{ name: 'content', params: { id: item.id } }">
                <h2>{{ item.title }}</h2>
              </router-link>
              <p>{{ item.abstract }}</p>
            </section>
            <footer class="panel-footer">
              <section class="row">
                <span class="col-lg-4"><i class="icon-calendar"></i>  时间: {{ item.subTime }}</span>
                <span class="col-lg-8"><i class="icon-tags"></i> 标签: {{ item.tag }}</span>
              </section>
            </footer>
          </article>
        </li>
      </ul>
    </transition>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['articles'])
  },
  mounted () {
    this.show = true
    this.getArticles()
  },
  name: 'main',
  data () {
    return {
      show: false
    }
  },
  components: {

  },
  methods: {
    ...mapActions(['getArticles'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding-top: 30px;
}
ul {
  padding: 0;
  list-style-type: none;
}
ul li article {
  overflow: hidden;
}
.panel-body {
  background-size: cover;
  height: 150px;
}
.panel-body h2 {
  margin-top: 0;
}
.panel-body p {
  text-indent: 2em;
  line-height: 28px;
  font-size: 18px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(50px);
}
</style>
