<template>


    <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
      <el-form-item prop="username">
        <el-input size="small" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
          <i slot="prefix" class="iconfont icon-yonghu"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="small" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
          <i slot="prefix" class="iconfont icon-mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="14">
            <el-input size="small" :maxlength="code.len" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码">
              <i slot="prefix" class="iconfont icon-yanzhengma"></i>
            </el-input>
          </el-col>
          <el-col :span="10">
            <div class="login-code">
              <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{code.value}}</span>
              <img :src="code.src" alt="验证码" class="login-code-img" @click="refreshCode" v-else/>
              <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleLogin" class="login-submit" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>

</template>

<script>
import { randomLenNum } from '@/utils/util'
import { mapGetters } from 'vuex'
export default {
  name: 'userlogin',
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        randomStr: ''
      },
      code: {
        src: '/admin/code',
        value: '',
        len: 4,
        type: 'image'
      },
      loginRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  created() {
    this.refreshCode()
  },
  computed: {
    ...mapGetters(['tagWel'])
  },
  methods: {
    refreshCode() {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.loginForm.randomStr}`)
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(err => {
            this.$message.error(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

      // var obj = this
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     obj.$store.dispatch('LoginByUsername', this.loginForm).then(
      //       res => {
      //         // this.$store.commit('ADD_TAB', this.tagWel)
      //         // this.$router.push({ path: this.tagWel.value })
      //         obj.$router.push({ path: '/' })
      //         console.info('success')
      //       }
      //     ).catch(() => {
      //       obj.refreshCode()
      //     })
      //   }
      // })
    }
  }
}
</script>

