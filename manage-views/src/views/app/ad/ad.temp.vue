<template>
  <el-dialog :title="setTitle" :visible.sync="other.isShow" center>
    <el-form :model="from" label-width="120px" label-position="left" size="medium">
      <el-form-item label="广告类型" prop="type">
        <el-select v-model="from.type" placeholder="请选择广告类型">
          <el-option label="开屏广告" :value="1"></el-option>
          <el-option label="轮播广告" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址" prop="url">
        <el-input v-model="from.url"></el-input>
      </el-form-item>
      <el-form-item label="广告图">
        <el-upload
          action="null"
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleAdimgChange"
          :on-remove="handleAdimgRemove"
          :multiple="false"
          :auto-upload="false"
        >
          <!-- <img v-if="status.add&&upload.coverUrl" :src="upload.coverUrl" class="avatar" /> -->
          <!-- <img v-else-if="status.edit&&upload.coverUrl" :src="upload.coverUrl" class="avatar" /> -->
          <img v-if="from.url" :src="from.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转" prop="resource">
        <el-radio-group v-model="from.is_href">
          <el-radio :label="1">允许跳转</el-radio>
          <el-radio :label="0">禁止跳转</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="跳转地址" prop="href_url">
        <el-input v-model="from.href_url"></el-input>
      </el-form-item>
      <el-form-item v-if="category!=null" label="广告类别">
        <el-select v-model="from.categoryId" placeholder="请选择广告类别">
          <el-option
            v-for="(item,index) of category"
            :key="index"
            :label="item.zh_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="other.type === 'add'" type="primary" @click="handleAddAdimg()">立刻新增</el-button>
        <el-button v-else @click="handleEditAdimg()">提交修改</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button -->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getObjectURL } from '@/utils/index.js'
export default {
  name: 'AdTemp',
  props: {
    other: {
      type: Object,
      default () {
        return {}
      }
    },
    from: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      category: null,
      upload: {
        adimg: null
      }
    }
  },
  computed: {
    setTitle() {
      return this.other.type === 'add' ? '新增广告' : '编辑广告'
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    handleAdimgChange(file, fileList) {
      // 规定允许上传的文件最大值
      const MAX_VAL = 1024 * 1024 * 0.5
      const mimetype = file.raw.type.split('/')[0].toLowerCase()
      if (file.size > MAX_VAL) {
        this.$message({
          message: '文件大小超过限制，文件最大为500KB!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleAdimgRemove(file, fileList, 'warn')
      } else if (mimetype !== 'image') {
        this.$message({
          message: '请选择图片!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleAdimgRemove(file, fileList, 'warn')
      } else {
        // 清空
        this.upload.adimg = new FormData()
        // 赋值准备提交
        this.upload.adimg.append('adimg', file.raw)
        this.from.url = getObjectURL(file.raw)

        // 触发当前项覆盖前一项
        this.handleAdimgRemove(file, fileList)
      }
    },
    handleAdimgRemove(file, fileList, tip) {
      // 如果有第三个参数，则为异常 查找出并删除
      if (tip) {
        fileList = fileList.filter((item, index) => {
          // 删除提示文本
          if (item.uid === file.uid) fileList.splice(index, 1)
          return item.uid !== file.uid
        })
      } else if (fileList.length > 1) {
        // 当数组长度超过 1 时，则每次删除之前传进来的那一项
        fileList.splice(0, 1)
      }
    },
    async getCategory() {
      const { result } = await this.$api.bookmanage.category()
      this.category = result
    },
    async handleAddAdimg() {
      const { adimgUrl } = await this.$api.app.updateAdimg(this.upload.adimg)
      this.from.url = adimgUrl
      await this.$api.app.createAdimg(this.from)
      this.other.isShow = false
      this.$emit('update')
    },
    async handleEditAdimg() {
      // 判断存储 广告图 的formdata是否有值  有就上传
      if (this.upload.adimg.has('adimg')) {
        // 上传广告图
        const { adimgUrl } = await this.$api.app.updateAdimg(this.upload.adimg)
        this.from.url = adimgUrl
      }
      await this.$api.app.editAdimg(this.from.id, this.from)
      this.other.isShow = false
      this.$emit('update')
    }

  }
}
</script>

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

.el-upload:hover {
  border-color: #409eff;
}
.el-form {
  padding: 0 30px;
  width: 700px;
}
</style>
