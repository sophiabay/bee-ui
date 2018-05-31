import request from '@/router/axios'

export function getMenu() {
  return request({
    url: '/admin/menu/userMenu',
    method: 'get'
  })
}
