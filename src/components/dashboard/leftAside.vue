<template>
  <aside class="col-lg-1">
    <el-menu default-active="0" class="el-menu-vertical-demo">
      <router-link :to="{ path: '/dashboard' }">
        <el-menu-item index="0"><i class="icon-home"></i> dashboard</el-menu-item>
      </router-link>
      <router-link :to="{ name: 'dbList' }">
        <el-menu-item index="1"><i class="icon-tags"></i> 文章列表</el-menu-item>
      </router-link>
      <router-link :to="{ name: 'writeArticle' }">
        <el-menu-item index="3"><i class="icon-tags"></i> 写文章</el-menu-item>
      </router-link>
      <router-link :to="{ path: '' }">
        <el-menu-item index="4">...</el-menu-item>
      </router-link>
    </el-menu>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
aside {
  height: 100%;
  background-color: #1b6d95;
}
.el-menu {
  background-color: #1b6d95;
}
ul a {
  text-decoration: none;
}
ul li {
  color: #ffffff;
  font-size: 15px;
}
.col-lg-1 {
  padding: 30px 0 0 0;
}
</style>
