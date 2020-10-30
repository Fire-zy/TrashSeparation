import request from '@/utils/request'

// 查询用户
export function queryUser() {
  return request({
    url: 'http://192.144.225.15:10040/JcUser/get',
    method: 'get'
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: 'http://192.144.225.15:10040/JcUser/add',
    method: 'post',
    data
  })
}

// 按id删除用户
export function deleteUser(data) {
  return request({
    url: 'http://192.144.225.15:10040/JcUser/delete',
    method: 'get',
    params:data
  })
}






export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
