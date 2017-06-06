<template>
  <div class="col-lg-7">
    <el-table
            :data="articles"
            border
            style="width: 100%">
      <el-table-column
              prop="id"
              label="id"
              width="80">
      </el-table-column>
      <el-table-column
              prop="title"
              label="标题"
              width="180">
      </el-table-column>
      <el-table-column
              prop="author"
              label="作者"
              width="180">
      </el-table-column>
      <el-table-column
              prop="subTime"
              label="时间">
      </el-table-column>
      <el-table-column
              prop="tags"
              label="标签">
      </el-table-column>
      <el-table-column
              label="操作">
        <template scope="scope">
          <el-button type="text">
            <router-link :to="{name:'editArticle', query: { id: scope.row.id }}">
              编辑
            </router-link>
          </el-button>
          <el-button @click="localdelete(scope.row)" type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  mounted () {
    this.getArticles()
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    ...mapActions(['getArticles', 'deleteArticle']),
    localdelete (obj) {
      this.deleteArticle({id: obj.id, title: obj.title}).then(x => {
        this.showNot(x)
        this.getArticles()
      })
    },
    showNot (x) {
      this.$notify({
        title: x.bool ? '成功' : '失败',
        message: x.msg,
        type: x.bool ? 'success' : 'warning'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
