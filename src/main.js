import Vue from 'vue'
import VueAxios from 'vue-axios'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from './router/axios'

import AVUEs from '../packages/index.js'
import { AvueCrud } from '../packages/crud/_index'

import { loadStyle } from './utils/util'
import * as urls from './config/env'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters
import './styles/common.scss'

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueAxios, axios)
Vue.use(AVUEs)
Vue.use(AvueCrud)

Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
