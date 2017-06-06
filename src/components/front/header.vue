<template>
  <header>
    <transition name="slide-fade3">
      <section class="fixedBar" v-if="barShow">
        <span class="barwords col-lg-4 col-lg-offset-2">{{ headerContent.title }}{{ headerContent.words }}</span>
      </section>
    </transition>
    <section class="banner row" :style="bannerBg">
      <transition name="slide-fade" v-on:enter="afterEnter" v-on:leave="leave">
        <span v-if="titleShow" class="title col-lg-5 col-lg-offset-2">{{ headerContent.title }}</span>
      </transition>
      <transition name="slide-fade2">
        <span v-if="wordsShow" class="words col-lg-5">{{ headerContent.words }}</span>
      </transition>
    </section>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  mounted () {
    document.head.querySelector('title').innerText = this.headerContent.title
    window.addEventListener('scroll', this.menu)
    this.titleShow = true
  },
  computed: {
    ...mapState(['headerContent'])
  },
  data () {
    return {
      titleShow: false,
      wordsShow: false,
      barShow: false,
      scroll: '',
      bannerBg: 'background: url("/static/img/1.jpeg")'
    }
  },
  methods: {
    afterEnter () {
      this.wordsShow = true
    },
    leave () {
      this.wordsShow = false
    },
    menu () {
      this.scroll = document.body.scrollTop
      if (this.scroll > 180) {
        this.barShow = true
        this.titleShow = false
      } else {
        this.barShow = false
        this.titleShow = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 250px;
}
.title {
  position: absolute;
  top: 100px;
  font-size: 40px;
  color: #ffffff;
}
.words {
  position: absolute;
  top: 150px;
  font-size: 20px;
  font-style: italic;
  color: #ffffff;
  margin-left: 20%;
}
.fixedBar {
  position: fixed;
  width: 100%;
  height: 40px;
  z-index: 9999;
  background: url("/static/img/1.jpeg");
}
.fixedBar span {
  color: #ffffff;
  font-size: 20px;
  line-height: 40px;
}
.barwords {
  text-align: center;
}
.row {
  margin: 0;
}
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(30px);
  opacity: 0;
}
.slide-fade2-enter-active {
  transition: all 1.5s ease;
}
.slide-fade2-leave-active {
  transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade2-enter, .slide-fade2-leave-active {
  transform: translateX(30px);
  opacity: 0;
}
.slide-fade3-enter-active {
  transition: all 1s ease;
}
.slide-fade3-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade3-enter, .slide-fade3-leave-active {
  transform: translateY(-40px);
  opacity: 0;
}
</style>
