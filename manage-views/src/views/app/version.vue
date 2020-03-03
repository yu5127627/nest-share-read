<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="appForm"
      label-width="120px"
      label-position="top"
      style="width:500px;padding-left:40px;"
    >
      <el-form-item label="Appid">
        <el-input v-model="appForm.appid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="App版本号">
        <el-input v-model="appForm.version"></el-input>
      </el-form-item>
      <el-form-item label="更新信息">
        <el-input v-model="appForm.content"></el-input>
      </el-form-item>
      <el-form-item label="热更新下载地址">
        <el-input v-model="appForm.hot_url"></el-input>
      </el-form-item>
      <el-form-item label="整包下载地址">
        <el-input v-model="appForm.pack_url"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button type="warning" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appForm: {
        appid: '__UNI__BF91653',
        version: '',
        content: '',
        hot_url: '',
        pack_url: ''
      }
    }
  },
  created() {
    this.getAppInfo()
  },
  methods: {
    async  onSubmit() {
      const { result } = await this.$api.app.setApp(this.appForm)
      this.appForm = result
    },
    async getAppInfo() {
      const { result } = await this.$api.app.getApp()
      this.appForm = result
    }
  }
}
</script>
