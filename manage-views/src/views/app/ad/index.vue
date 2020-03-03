<template>
  <div class="category-page app-container">
    <div class="el-child-head">
      <div class="operate">
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAddDialog()"
        >新增广告</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="batchDel()">批量删除</el-button>
      </div>
    </div>
    <div class="el-table-box">
      <el-table :data="adImg" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="60px" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" :formatter="typeText" width="120px" align="center"></el-table-column>
        <el-table-column
          prop="is_href"
          label="是否支持跳转"
          :formatter="isHrefText"
          width="160px"
          align="center"
        ></el-table-column>
        <el-table-column prop="url" label="URL地址" align="center"></el-table-column>
        <el-table-column prop="href_url" label="跳转地址" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="120px">
          <template slot-scope="scope">
            <el-switch
              :value="Boolean(scope.row.status)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwithStatus(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ad-img :other="adImgData" :from="adImgForm" @update="watchUpdate"></ad-img>
  </div>
</template>

<script>
import { resetData } from '@/utils/auth.js'
import adImg from './ad.temp'
export default {
  components: {
    adImg
  },
  data() {
    return {
      adImg: [],
      adImgForm: {
        type: null,
        url: null,
        is_href: null,
        href_url: null,
        categoryId: null
      },
      adImgData: {
        isShow: false,
        type: 'add'
      }
    }
  },
  created() {
    this.getAllAdimg()
  },
  methods: {
    async handleSwithStatus(index, row) {
      row.status = row.status === 1 ? 0 : 1
      await this.$api.app.editAdimg(row.id, row)
      this.getAllAdimg()
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { id } = row
          await this.$api.app.removeAdimg(id)
          this.getAllAdimg()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    watchUpdate() {
      this.getAllAdimg()
    },
    openAddDialog() {
      this.adImgForm = resetData(this.adImgForm)
      this.adImgData.type = 'add'
      this.adImgData.isShow = true
    },
    openEditDialog(index, row) {
      row.typeText = row.type === 1 ? '开屏广告' : '轮播广告'
      this.adImgForm = resetData(this.adImgForm, row)
      this.adImgData.type = 'edit'
      this.adImgData.isShow = true
    },
    async getAllAdimg() {
      const { result } = await this.$api.app.findAdimg()
      this.adImg = result
    },
    typeText(row) {
      if (row.type === 1) return '开屏广告'
      if (row.type === 2) return '轮播广告'
    },
    isHrefText(row) {
      if (row.is_href === 0) return '禁止跳转'
      if (row.is_href === 1) return '允许跳转'
    }
  }
}
</script>

<style>
</style>
