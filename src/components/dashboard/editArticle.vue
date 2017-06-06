<template>
  <div class="writeArticle">
    <el-input v-model="article.title" placeholder="请输入标题..."></el-input>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="前端"></el-checkbox>
      <el-checkbox label="node"></el-checkbox>
      <el-checkbox label="生活"></el-checkbox>
      <el-checkbox label="vue"></el-checkbox>
      <el-checkbox label="windows"></el-checkbox>
      <el-checkbox label="mac"></el-checkbox>
      <el-checkbox label="linux"></el-checkbox>
      <el-checkbox label="其他"></el-checkbox>
    </el-checkbox-group>
    <VueUEditor ueditorPath="/static/ueditor/" @ready="editorReady"></VueUEditor>
    <el-button type="primary" @click="subArticle">保存</el-button>
  </div>
</template>

<script>
import VueUEditor from './UEditor.vue'
import { mapActions, mapState } from 'vuex'
export default {
  mounted () {
    if (this.$route.query.id) {
      this.getArticle(this.$route.query.id)
      this.checkList = this.article.tags.split(' ')
    }
  },
  data () {
    return {
      checkList: []
    }
  },
  computed: {
    ...mapState(['article'])
  },
  components: {
    VueUEditor
  },
  methods: {
    ...mapActions(['setArticle', 'getArticle']),
    editorReady (instance) {
      instance.setContent(this.article.content)

      instance.addListener('contentChange', () => {
        this.article.content = instance.getContent()
      })
    },
    showNot (x) {
      this.$notify({
        title: x.bool ? '成功' : '失败',
        message: x.msg,
        type: x.bool ? 'success' : 'warning'
      })
    },
    subArticle () {
      let self = this
      self.setArticle().then((x) => {
        self.showNot(x)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .writeArticle {
    padding: 30px 0 0 30px;
    height: 100%;
    overflow-y: scroll;
  }
  .el-input {
    width: 1200px;
    margin-bottom: 30px;
  }
</style>
