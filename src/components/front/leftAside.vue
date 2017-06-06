<template>
  <aside>
    <section class="secHeader"></section>
    <section class="secMain">
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <router-link :to="{ name: 'home' }">
          <el-menu-item index="0"><i class="icon-home"></i> 首页</el-menu-item>
        </router-link>
        <router-link :to="{ path: '/about' }">
          <el-menu-item index="3">关于</el-menu-item>
        </router-link>
      </el-menu>
    </section>
    <section class="secFooter"></section>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
aside {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 270px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #eef1f6;
  box-shadow: 0 0 25px 5px #cccccc;
  z-index: 9999;
}
.secHeader {
  height: 20%;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("/static/img/1.jpeg");
  background-size: cover;
}
.secMain  {
  height: 50%;
}
.secMain a {
  text-decoration: none;
}
.secFooter {
  height: 30%;
  position: relative;
  left: 0;
  background-image: url("/static/img/2.jpg");
  background-size: cover;
}
ul {
  padding: 20px;
}
ul li {
  font-size: larger;
}
</style>
