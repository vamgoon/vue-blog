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
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      article: {
        title: '',
        content: '',
        abstract: '',
        author: '',
        subTime: '',
        tags: '',
        imgSrc: ''
      },
      checkList: []
    }
  },
  components: {
    VueUEditor
  },
  methods: {
    ...mapActions(['setArticle']),
    editorReady (instance) {
      instance.setContent('在此输入内容...')

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
      if (this.article.title === '') {
        this.$notify({
          title: '注意',
          message: '标题不能为空',
          type: 'warning'
        })
        return
      }
      this.article.author = 'Vamgoon'
      this.article.tags = this.checkList.join(' ')
      this.article.subTime = new Date().toLocaleString().split(' ')[0].toString()
      this.article.abstract = ''
      this.article.imgSrc = document.querySelector('img', this.$el) === null ? '/static/img/1.jpeg' : document.querySelector('img', this.$el).src
      self.setArticle(this.article).then((x) => {
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
    margin-bottom: 5px;
  }
  .tags {
    width: 1200px;
    height: 30px;
    border-bottom: 1px dashed #cccccc;
  }
</style>
