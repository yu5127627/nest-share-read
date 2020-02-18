<template>
  <div class="app-container">
    <div class="el-table-box">
      <el-table ref="multipleTable" border size="medium" :data="tableData">
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="login_time" label="最后一次登陆时间" align="center" :formatter="setTime" />
        <el-table-column prop="roles" label="权限" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: null,
      resetForm: {
        id: '',
        zh_name: '',
        en_name: ''
      }
    }
  },
  created() {
    this.getaAllManager()
  },
  methods: {
    setTime(row, column) {
      return parseTime(row.login_time)
    },
    async getaAllManager() {
      const { result } = await this.$api.site.manager()
      this.tableData = result
    }
  }
}
</script>

<style scoped>
</style>

