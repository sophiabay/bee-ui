import { validatenull } from './validate'
import { baseUrl } from '@/config/env'
/* Layout */
import Layout from '../views/layout/Layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

export const initMenu = (router, menu) => {
  if (menu.length === 0) {
    return
  }
  router.addRoutes(formatRoutes(menu))
}

export const formatRoutes = (aMenu) => {
  const aRouter = []

  // const tRouter = []
  // const tMenu = {
  //   path: '/admin',
  //   component: Layout,
  //   meta: {
  //     title: 'user',
  //     icon: 'lock'
  //   },
  //   children: [{
  //     path: 'user/index',
  //     component: _import('admin/user/index'),
  //     name: 'user',
  //     meta: { title: 'user', icon: 'dashboard', noCache: true }
  //   }]
  // }
  // tRouter.push(tMenu)

  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      children,
      meta
    } = oMenu

    // if (!validatenull(component)) {
    //   if (validatenull(children)) {
    //     const oRouter = {
    //       // path: '/admin/user/index',
    //       path: path,
    //       component: null,
    //       name: 'user',
    //       meta: meta
    //     }
    //     oRouter.component = _import('admin/user/index')
    //     aRouter.push(oRouter)
    //   } else {
    //     const oRouter = {
    //       // path: '/admin',
    //       path: '/' + path,
    //       component: null,
    //       alwaysShow: true,
    //       name: 'user',
    //       meta: meta,
    //       children: validatenull(children) ? [] : formatRoutes(children)
    //     }
    //     oRouter.component = Layout
    //     aRouter.push(oRouter)
    //   }
    // }

    

    if (!validatenull(component)) {
      const oRouter = {
        path: (!validatenull(component) && children.length > 0) ? '/' + path : path,
        // component(resolve) {
        //   let componentPath = ''
        //   console.info(component)
        //   if (component === 'Layout') {
        //     // require(['../views/layout/Layout.vue'], resolve)
        //     return Layout
        //   } else {
        //     componentPath = component
        //   }
        //   require([`../${componentPath}.vue`], resolve)
        // },
        // // component: null,
        component: (component === 'Layout') ? Layout : _import(component),
        name: name,
        children: validatenull(children) ? [] : formatRoutes(children),
        meta: { title: 'user', icon: 'dashboard' }
      }
      // if (component === 'Layout') {
      //   oRouter.component = Layout
      // } else {
      //   oRouter.component = _import(component)
      // }
      // if (children.length > 0) {
      //   oRouter.path = '/' + oRouter.path
      // }
      aRouter.push(oRouter)
    }
  })

  return aRouter
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  const {
    data,
    type,
    param
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else if (type === 'Aes') {
    param.forEach(ele => {
      // result[ele] = CryptoJS.AES.encrypt(result[ele], key).toString()
    })
  }
  return result
}

/**
 * 设置浏览器头部标题
 */
export const setTitle = (title) => {
  title = title ? `${title}——快速开发框架` : '快速开发框架'
  window.document.title = title
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('msfullscreenchange', function (e) {
    listen()
  })
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace('#', '').replace(port, '')}}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}

/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
  } else {
    value = $route.path
  }
  return value
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number') {
    let index = 0
    index = findArray(dic, value)
    if (index !== -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index !== -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}
