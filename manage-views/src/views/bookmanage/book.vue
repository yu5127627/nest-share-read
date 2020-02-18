<template>
  <div class="category-page app-container">
    <div class="el-child-head">
      <div class="operate">
        <el-button
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAddDialog()"
        >新增图书</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="batchDel()">批量删除</el-button>
      </div>
      <el-form ref="form" :model="query" size="mini" :inline="true">
        <el-form-item>
          <el-select v-if="allCategory!=null" v-model="query.category" placeholder="书籍类型">
            <el-option
              v-for="(item,index) in allCategory"
              :key="index"
              :label="item.zh_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.name" placeholder="请输入书名" />
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" @click="handleSearch()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="el-table-box">
      <el-table
        ref="multipleTable"
        border
        size="medium"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column type="expand" align="center">
          <template slot-scope="props">
            <div style="display:flex;">
              <el-form size="mini" style="width:50%" label-width="80px" label-position="left">
                <el-form-item label="中文名称">
                  <span>{{ props.row.zh_name }}</span>
                </el-form-item>
                <el-form-item label="英文名称">
                  <span>{{ props.row.en_name }}</span>
                </el-form-item>
                <el-form-item label="出版日期">
                  <span>{{ setTime(props.row) }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category.zh_name }}</span>
                </el-form-item>
                <el-form-item label="总页数">
                  <span>{{ props.row.total_page }}</span>
                </el-form-item>
                <el-form-item label="图书描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="图书特点">
                  <span>{{ props.row.feature }}</span>
                </el-form-item>
                <el-form-item label="关于作者">
                  <span>{{ props.row.about_author }}</span>
                </el-form-item>
              </el-form>
              <el-form size="mini" style="width:50%" label-width="80px" label-position="left">
                <el-form-item label="图书封面">
                  <el-image style="width: 100px; height: 100px" :src="props.row.cover" fit="fill" />
                </el-form-item>
                <el-form-item label="图书目录">
                  <el-image
                    v-for="(item,index) in JSON.parse(props.row.catalog)"
                    :key="index"
                    style="width: 100px; height: 100px"
                    :src="item"
                    fit="fill"
                  />
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zh_name" label="中文名称" align="center" />
        <el-table-column prop="en_name" label="英文名称" align="center" />
        <el-table-column prop="create_time" label="出版日期" :formatter="setTime" align="center" />
        <el-table-column prop="total_page" label="总页数" align="center" />
        <el-table-column prop="category.zh_name" label="所属分类" align="center" />
        <el-table-column prop="is_hot" label="热门" align="center">
          <template slot-scope="scope">
            <el-switch
              :value="Boolean(scope.row.is_hot)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwithHot(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="is_new" label="最新" align="center">
          <template slot-scope="scope">
            <el-switch
              :value="Boolean(scope.row.is_new)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwithNew(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="is_recommend" label="推荐" align="center">
          <template slot-scope="scope">
            <el-switch
              :value="Boolean(scope.row.is_recommend)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwithRecommend(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-table-pagination">
        <!-- 分页 -->
        <el-pagination
          :current-page="1"
          :page-size="query.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="query.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog title="新增图书" :visible.sync="dialogFormVisible" center>
      <el-form
        :model="resetForm"
        style="width:500px;padding-left:40px;"
        :label-width="formLabelWidth"
        size="small "
        label-position="left"
      >
        <el-form-item label="中文名称">
          <el-input v-model="resetForm.zh_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="resetForm.en_name" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="allCategory!=null" label="活动区域">
          <el-select v-model="resetForm.category" placeholder="请选择图书分类">
            <el-option
              v-for="(item,index) in allCategory"
              :key="index"
              :label="item.zh_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书总页数">
          <el-input v-model="resetForm.total_page" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出版时间">
          <el-date-picker
            v-model="resetForm.create_time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="图书描述">
          <el-input v-model="resetForm.description" type="textarea" rows="5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图书特征">
          <el-input v-model="resetForm.feature" type="textarea" rows="5" autocomplete="off" />
        </el-form-item>

        <el-form-item label="关于作者">
          <el-input v-model="resetForm.about_author" type="textarea" rows="5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="书籍导入">
          <el-upload
            ref="books_upload"
            class="upload-demo"
            action="null"
            :on-change="handleBooksChange"
            :on-remove="handleRemoveBooks"
            :multiple="false"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >{{ status.edit===true?'无需修改请勿操作。只能上传 pdf 文件，且不超过20MB！':'只能上传 pdf 文件，且不超过20MB' }}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
            action="null"
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="handleCoverChange"
            :on-remove="handleRemoveCover"
            :multiple="false"
            :auto-upload="false"
          >
            <img v-if="status.add&&upload.coverUrl" :src="upload.coverUrl" class="avatar" />
            <img v-else-if="status.edit&&upload.coverUrl" :src="upload.coverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="目录截图">
          <el-upload
            list-type="picture-card"
            action="null"
            :show-file-list="true"
            :on-change="handleCatalogChange"
            :on-remove="handleRemoveCatalog"
            :multiple="false"
            :auto-upload="false"
            :file-list="upload.catalogUrl"
          >
            <i class="el-icon-plus" />
          </el-upload>
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
import { parseTime } from '../../utils/index'
import { resetData } from '../../utils/auth.js'
export default {
  data() {
    return {
      tableData: null,
      allCategory: null,
      status: {
        add: false,
        edit: false
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      resetForm: {
        id: '',
        zh_name: '中文名字',
        en_name: '英文名字',
        cover: '', // 封面
        book: '', // 图书
        description: '描述',
        feature: '特征', // 特性
        create_time: '出版时间', // 出版时间
        total_page: '200', // 页数
        catalog: '', // 目录截图
        about_author: '作者信息', // 作者相关
        category: '' // 类别
      },
      query: {
        total: 0,
        limit: 20,
        page: 1,
        category: '',
        name: ''
      },
      booksIdArr: [],
      upload: {
        book: new FormData(),
        cover: new FormData(),
        coverUrl: null,
        catalog: new FormData(),
        catalogUrl: []
      }
    }
  },
  async created() {
    this.getBooks()
    const { result } = await this.$api.bookmanage.category()
    this.allCategory = result
  },
  methods: {
    async handleSwithHot(index, row) {
      row.is_hot = row.is_hot === 1 ? 0 : 1
      await this.$api.bookmanage.editBooks(row.id, row)
      this.getBooks()
    },
    async handleSwithNew(index, row) {
      row.is_new = row.is_new === 1 ? 0 : 1
      await this.$api.bookmanage.editBooks(row.id, row)
      this.getBooks()
    },
    async handleSwithRecommend(index, row) {
      row.is_recommend = row.is_recommend === 1 ? 0 : 1
      await this.$api.bookmanage.editBooks(row.id, row)
      this.getBooks()
    },
    // 监听每页的页数变化
    handleSizeChange(limit) {
      this.query.limit = limit
      this.getBooks()
    },
    // 监听页面的变化
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getBooks()
    },
    resetFormData() {
      this.upload.book = new FormData()
      this.upload.cover = new FormData()
      this.upload.catalog = new FormData()
      this.upload.catalogUrl = []
      this.upload.coverUrl = null
    },
    // 打开新增图书窗口
    openAddDialog() {
      this.status.add = true
      this.status.edit = false
      // 重置表单绑定的数据
      this.resetForm = resetData(this.resetForm)
      // 重置formdata
      this.resetFormData()
      // 设置目录截图的默认格式
      this.resetForm.catalogUrl = [{ name: 'catalog', url: null }]
      this.dialogFormVisible = true
    },
    // 打开编辑图书窗口
    openEditDialog(index, row) {
      this.status.add = false
      this.status.edit = true
      // 重置表单绑定的数据
      this.resetForm = resetData(this.resetForm, row)
      // 重置formdata
      this.resetFormData()
      // 绑定要上传的封面文件连接
      this.upload.coverUrl = this.resetForm.cover
      // 将序列化的目录截图数组转换为json
      this.resetForm.catalog = JSON.parse(this.resetForm.catalog)
      // 赋值给要展示的数组
      for (const item of this.resetForm.catalog) {
        this.upload.catalogUrl.push({ name: 'catalog', url: item })
      }
      // 恢复原先的序列化
      this.resetForm.catalog = JSON.stringify(this.resetForm.catalog)
      // 设置图书类别的名称
      this.resetForm.category = row.category.zh_name
      this.dialogFormVisible = true
    },
    // 新增上传
    async handleAdd() {
      // 先上传选中的文件 最后提交文件路径
      // 上传封面图
      const { coverUrl } = await this.$api.bookmanage.cover(this.upload.cover)
      // 上传图书
      const { bookUrl } = await this.$api.bookmanage.book(this.upload.book)
      // 上传图书目录截图，因为是多个截图
      for (const item of this.upload.catalogUrl) {
        this.upload.catalog.append('catalog', item.raw)
      }
      const catalog = await this.$api.bookmanage.catalog(this.upload.catalog)
      // 将文件路径赋值
      this.resetForm.cover = coverUrl
      this.resetForm.book = bookUrl
      this.resetForm.catalog = JSON.stringify(catalog)
      const { id, ...result } = this.resetForm
      // 新建图书接口
      await this.$api.bookmanage.addBooks(result)
      this.dialogFormVisible = false
      this.getBooks()
    },
    async handleEdit() {
      // 判断存储 封面图 的formdata是否有值  有就上传
      if (this.upload.cover.has('cover')) {
        // 上传封面图
        const { coverUrl } = await this.$api.bookmanage.cover(this.upload.cover)
        this.resetForm.cover = coverUrl
      }
      // 上传图书目录
      const interimArr = []
      // 循环存储目录截图的数组  有 raw 的即为新增的 没有即已上传的截图  避免重复上传
      for (const item of this.upload.catalogUrl) {
        if (item.raw) {
          this.upload.catalog.append('catalog', item.raw)
        } else {
          interimArr.push(item.url)
        }
      }
      // 判断存储 目录截图 的formdata是否有值  有就上传
      if (this.upload.catalog.has('catalog')) {
        const catalog = await this.$api.bookmanage.catalog(this.upload.catalog)
        const newInterimArr = interimArr.concat(catalog)
        // 序列化
        this.resetForm.catalog = JSON.stringify(newInterimArr)
      } else {
        this.resetForm.catalog = JSON.stringify(interimArr)
      }
      // 判断存储 图书 的formdata是否有值  有就上传
      if (this.upload.book.has('book')) {
        // 上传图书
        const { bookUrl } = await this.$api.bookmanage.book(this.upload.book)
        this.resetForm.book = bookUrl
      }
      const { id, ...result } = this.resetForm
      for (const item of this.allCategory) {
        if (item.zh_name === result.category) {
          result.category = item.id
          break
        }
      }
      await this.$api.bookmanage.editBooks(id, result)
      this.dialogFormVisible = false
      this.getBooks()
    },
    handleSearch() {
      this.getBooks()
    },
    async getBooks() {
      const { total: ignore, ...result } = this.query
      const books = await this.$api.bookmanage.books(result)
      const { data, total } = books
      this.tableData = data
      this.query.total = total
    },
    setTime(row, column) {
      return parseTime(row.create_time)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(selection) {
      this.booksIdArr = []
      for (const item of selection) {
        this.booksIdArr.push(item.id)
      }
    },
    async batchDel() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$api.bookmanage.batchDelBooks(this.booksIdArr)
          this.getBooks()
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
    handleBooksChange (file, fileList) {
      // 规定允许上传的文件最大值
      const MAX_VAL = 1024 * 1024 * 20
      // 规定允许上传的文件格式
      const ALLOW_FORMAT = ['pdf']
      // 以 . 分割文件名称，获取文件后缀名
      const strArr = file.name.split('.')
      if (file.size > MAX_VAL) {
        this.$message({
          message: '文件大小超过限制，文件最大为20MB!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleRemoveBooks(file, fileList, 'warn')
      } else if (!ALLOW_FORMAT.includes(strArr[strArr.length - 1])) {
        // 判断是否时允许上传的文件格式，因为 window 允许 . 为文件名，故取数组中的最后一项为文件后缀名
        this.$message({
          message: '文件格式不符，只能上传pdf文件!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleRemoveBooks(file, fileList, 'warn')
      } else {
        // 清空
        this.upload.book = new FormData()
        // 赋值准备提交
        this.upload.book.append('book', file.raw)
        // 触发当前项覆盖前一项
        this.handleRemoveBooks(file, fileList)
      }
    },
    handleRemoveBooks (file, fileList, tip) {
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
    handleCoverChange (file, fileList) {
      // 规定允许上传的文件最大值
      const MAX_VAL = 1024 * 1024 * 0.3
      // 规定允许上传的文件格式
      const ALLOW_FORMAT = ['jpg', 'png']
      // 以 . 分割文件名称，获取文件后缀名
      const strArr = file.name.split('.')
      if (file.size > MAX_VAL) {
        this.$message({
          message: '文件大小超过限制，文件最大为300KB!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleRemoveCover(file, fileList, 'warn')
      } else if (!ALLOW_FORMAT.includes(strArr[strArr.length - 1])) {
        // 判断是否时允许上传的文件格式，因为 window 允许 . 为文件名，故取数组中的最后一项为文件后缀名
        this.$message({
          message: '文件格式不符，只能上传 jpg/png 文件!',
          type: 'warning'
        })
        // 触发移除当前项
        this.handleRemoveCover(file, fileList, 'warn')
      } else {
        // 清空
        this.upload.cover = new FormData()
        // 赋值准备提交
        this.upload.cover.append('cover', file.raw)
        if (window.createObjectURL !== undefined) { // basic
          this.upload.coverUrl = window.createObjectURL(file.raw)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          this.upload.coverUrl = window.webkitURL.createObjectURL(file.raw)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          this.upload.coverUrl = window.URL.createObjectURL(file.raw)
        }
        // 触发当前项覆盖前一项
        this.handleRemoveCover(file, fileList)
      }
    },
    handleRemoveCover (file, fileList, tip) {
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
    handleCatalogChange(file, fileList) {
      if (window.createObjectURL !== undefined) { // basic
        this.upload.catalogUrl.push({ name: 'catalog', url: window.createObjectURL(file.raw), raw: file.raw })
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        this.upload.catalogUrl.push({ name: 'catalog', url: window.webkitURL.createObjectURL(file.raw), raw: file.raw })
      } else if (window.URL !== undefined) { // mozilla(firefox)
        this.upload.catalogUrl.push({ name: 'catalog', url: window.URL.createObjectURL(file.raw), raw: file.raw })
      }
    },
    handleRemoveCatalog(file, fileList) {
      for (const [index, item] of this.upload.catalogUrl.entries()) {
        if (file.uid === item.uid) {
          this.upload.catalogUrl.splice(index, 1)
        }
      }
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { id } = row
          await this.$api.bookmanage.delBooks(id)
          this.getBooks()
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
    }
  }
}
</script>

<style lang="scss" scpode>
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
</style>
