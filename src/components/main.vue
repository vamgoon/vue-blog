<template>
  <div id="appRoot">
    <myHeader v-if="isHeaderShow" :key="key"></myHeader>
    <router-view></router-view>
    <transition name="slide-fade">
      <left-aside v-if="asideShow"></left-aside>
    </transition>
    <i @click="showaside" class="switch icon-reorder icon-large"></i>
  </div>
</template>

<script>
import leftAside from './front/leftAside.vue'
import myHeader from './front/header.vue'
import { mapActions, mapState } from 'vuex'

export default {
  mounted () {
    this.initialHeaderContent()
  },
  data () {
    return {
      key: '',
      asideShow: false
    }
  },
  computed: {
    ...mapState(['isHeaderShow'])
  },
  methods: {
    ...mapActions(['setHeaderContent']),
    showaside () {
      this.asideShow = !(this.asideShow)
    },
    initialHeaderContent () {
      this.key = new Date()
      this.setHeaderContent(this.$route.name)
    }
  },
  name: 'app',
  components: {
    leftAside,
    myHeader
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'initialHeaderContent'
  }
}
</script>

<style>
  #appRoot {
    font-family: PingFangSC-Regular, sans-serif;
    padding: 0;
  }
  #appRoot::after {
    content: " ";
    clear: both;
    display: block;
    overflow: hidden;
  }
  .switch {
    z-index: 10000;
    position: fixed;
    left: 10px;
    top: 10px;
    color: #ffffff;
  }
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-270px);
  }
</style>
