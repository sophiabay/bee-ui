import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query
  })
}
export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}
export function addObj(obj) {
  return request({
    url: '/admin/user/',
    method: 'post',
    data: obj
  })
}
export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}
export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}
