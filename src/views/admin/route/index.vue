<template>
  <div class="app-container pull-auto">
    <el-button type="primary" @click="handleAdd" size="small" v-if="permissions.sys_route_add">新 增</el-button>
    <el-button type="success" @click="handleApply" size="small" v-if="permissions.sys_route_add">同 步</el-button>
    <el-button type="info" @click="handleExportExcel" size="small" v-if="permissions.sys_route_add">导出excel</el-button>
    <br /><br />
    <svue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" 
    :option="tableOption" @current-change="currentChange" @row-update="handleUpdate" @row-save="handleSave" @row-del="rowDel">
      <template slot-scope="scope" slot="menu">
        <el-button type="primary" v-if="permissions.sys_route_upd" icon="el-icon-check" size="small" plain @click="handleEdit(scope.row,scope.index)">编辑</el-button>
        <el-button type="danger" v-if="permissions.sys_route_del" icon="el-icon-delete" size="small" plain @click="handleDel(scope.row,scope.index)">删除</el-button>
      </template>
    </svue-crud>
  </div>
</template>

<script>
import { fetchList, addObj, putObj, delObj, applyObj } from '@/api/route'
import { tableOption } from '@/const/crud/route'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
export default {
  name: 'admin-route',
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption
    }
  },
  created() {
    this.getList()
  },
  mounted: function() {},
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    getList() {
      this.tableLoading = true
      fetchList({
        page: this.page.currentPage,
        limit: this.page.pageSize
      }).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },
    currentChange(val) {
      this.getList()
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function() {
      this.$refs.crud.rowAdd()
    },
    handleApply: function() {
      var _this = this
      this.$confirm('是否确认同步至网关路由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return applyObj()
        })
        .then(data => {
          _this.$message({
            showClose: true,
            message: '同步成功',
            type: 'success'
          })
        })
        .catch(function(err) {
          console.err(err)
        })
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    handleExportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['创建时间', '删除标记', '是否可用', 'Id']
        const filterVal = ['createTime', 'delFlag', 'enabled', 'id']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'test'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    rowDel: function(row, index) {
      var _this = this
      this.$confirm('是否确认删除ID为' + row.id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delObj(row.id)
        })
        .then(data => {
          _this.tableData.splice(index, 1)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(function(err) {
          console.err(err)
        })
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        done()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      addObj(row).then(data => {
        this.tableData.push(Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        done()
      })
    }
  }
}
</script>
