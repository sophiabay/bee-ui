<template>
  <div class='generator-container  pull-chheight'>
    <svue-form :option='formOption' v-model='tableForm'>
      <template slot-scope='scope' slot='dic'>
        <el-button @click.native='dicData.box=true'>
          字典选择
        </el-button>
      </template>
    </svue-form>
    <el-button type='primary' @click='handleAddColumn' size='small'>新增</el-button>
    <svue-crud ref='crud' :option='tableOption' :data='form.column' @row-update='handleUpdate' @row-del='handleDel' @row-save='handleSave'></svue-crud>
    <!-- <el-input type='textarea' v-model='result' :autosize='{ minRows: 10}'></el-input> -->
    <json-editor ref="jsonEditor" v-model="result"></json-editor>
    <el-dialog title='字典选择' :visible.sync='dicData.box'>
      <svue-crud-checkbox v-model='dicData.check' :dic='DIC.DATALIST'></svue-crud-checkbox>
      <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='handleDicSbumit'>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { DIC } from '@/const/dic'
import { validatenull } from '@/utils/validate'
import tableOption from '@/const/dev/tableDev'
import formOption from '@/const/dev/formDev'
import JsonEditor from '@/components/JsonEditor'
export default {
  name: 'table-generator',
  components: { JsonEditor },
  data() {
    return {
      tableOption: tableOption,
      formOption: formOption,
      DIC: DIC,
      tableForm: {
        width: '100%',
        dic: []
      },
      form: {
        column: []
      },
      result: '',
      dicData: {
        box: false,
        check: [],
        list: []
      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    form: {
      handler(n, o) {
        this.handleResult()
      },
      deep: true
    },
    tableForm: {
      handler(n, o) {
        for (const o in this.tableForm) {
          this.form[o] = this.tableForm[o]
        }
        this.handleResult()
      },
      deep: true
    }
  },
  mounted() {},
  computed: {},
  props: [],
  methods: {
    init() {
      this.tableOption.dic = ['CRUDTYPE', 'VAILDATA']
    },
    handleResult() {
      const form = JSON.parse(JSON.stringify(this.form))
      // 删除列没有填写的字段
      form.column.forEach(ele => {
        for (const o in ele) {
          if (validatenull(ele[o])) {
            delete ele[o]
          }
        }
      })
      const result = JSON.stringify(form, null, 2)
      this.result = JSON.parse(result)
    },
    handleDicSbumit() {
      this.tableForm.dic = ['CRUDTYPE', 'VAILDATA'].concat(this.dicData.check)
      this.tableOption.dic = this.tableForm.dic
      this.dicData.list = []
      this.tableOption.dic.forEach(ele => {
        this.dicData.list.push({
          label: ele,
          value: ele
        })
      })
      this.tableOption.column[
        this.tableOption.column.length - 1
      ].dicData = this.dicData.list
      this.dicData.box = false
    },
    handleAddColumn() {
      this.$refs.crud.rowAdd()
    },
    handleSave(row, done) {
      this.form.column.push(row)
      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
      done()
    },
    handleUpdate(row, index, done) {
      this.form.column.splice(index, 1, row)
      this.$message({
        showClose: true,
        message: '修改成功',
        type: 'success'
      })
      done()
    },
    handleDel(row, index) {
      this.$confirm(`是否确认删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.form.column.splice(index, 1)
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.generator-container {
  padding: 20px 10px;
  box-sizing: border-box;
}
</style>

