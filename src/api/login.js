// import request from '@/utils/request'
import request from '@/router/axios'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }

export function loginByUsername(username, password, code, randomStr) {
  var grant_type = 'password'
  var scope = 'server'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'Authorization': 'Basic YmVlOmJlZQ=='
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }

export function logout(accesstoken, refreshToken) {
  return request({
    url: '/auth/authentication/removeToken',
    method: 'post',
    params: { accesstoken, refreshToken }
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export const getUserInfo = (token) => {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

