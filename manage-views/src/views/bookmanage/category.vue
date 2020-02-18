<template>
  <div class="category-page app-container">
    <div class="el-child-head">
      <div class="operate">
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAddDialog()"
        >新增分类</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="batchDel()">批量删除</el-button>
      </div>
      <!-- 搜索 -->
      <el-form ref="form" :model="searchForm" size="mini" :inline="true" label-position="right">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="搜索分类名" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" plain @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分类列表 -->
    <el-table
      ref="multipleTable"
      border
      size="medium"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="zh_name" label="中文名称" align="center" />
      <el-table-column prop="en_name" label="英文名称" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑 -->
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" center>
      <el-form :model="resetForm">
        <el-form-item label="中文名称" :label-width="formLabelWidth">
          <el-input v-model="resetForm.zh_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-form :model="resetForm">
        <el-form-item label="英文名称" :label-width="formLabelWidth">
          <el-input v-model="resetForm.en_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="status.add" type="primary" @click="handleAdd()">确 定</el-button>
        <el-button v-if="status.edit" type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resetData } from '../../utils/auth.js'
export default {
  data() {
    return {
      tableData: null,
      searchForm: {
        name: ''
      },
      status: {
        add: false,
        edit: false
      },
      dialogFormVisible: false,
      resetForm: {
        id: '',
        zh_name: '',
        en_name: ''
      },
      categoryIdArr: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    openAddDialog() {
      this.status.add = true
      this.status.edit = false
      this.resetForm = resetData(this.resetForm)
      this.dialogFormVisible = true
    },
    openEditDialog(index, row) {
      this.status.add = false
      this.status.edit = true
      this.resetForm = resetData(this.resetForm, row)
      this.dialogFormVisible = true
    },
    async handleAdd() {
      const { zh_name, en_name } = this.resetForm
      await this.$api.bookmanage.addCategory({ zh_name, en_name })
      this.getCategory()
      this.dialogFormVisible = false
    },
    async handleEdit() {
      const { id, zh_name, en_name } = this.resetForm
      await this.$api.bookmanage.editCategory(id, { zh_name, en_name })
      this.getCategory()
      this.dialogFormVisible = false
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { id } = row
          await this.$api.bookmanage.delCategory(id)
          this.getCategory()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async getCategory() {
      const category = await this.$api.bookmanage.category()
      this.tableData = category.result
    },
    async batchDel() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$api.bookmanage.batchDelCategory(this.categoryIdArr)
          this.getCategory()
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
    handleSelectionChange(selection) {
      this.categoryIdArr = []
      for (const item of selection) {
        this.categoryIdArr.push(item.id)
      }
    }
  }
}
</script>
