import request from '@/utils/request'

// 查询用户
export function queryTransportation() {
  return request({
    url: 'http://192.144.225.15:10040/JcTransportation/get',
    method: 'get'
  })
}

// 添加用户
export function addTransportation(data) {
  return request({
    url: 'http://192.144.225.15:10040/JcTransportation/add',
    method: 'post',
    data
  })
}

// 按id删除用户
export function deleteTransportation(data) {
  return request({
    url: 'http://192.144.225.15:10040/JcTransportation/delete',
    method: 'get',
    params:data
  })
}

// 修改用户
export function updateTransportation(data) {
  return request({
    url: 'http://192.144.225.15:10040/JcTransportation/update',
    method: 'post',
    data
  })
}
