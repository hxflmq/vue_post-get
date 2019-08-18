import axios from 'axios'
// post方法
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.CENTER_API + url,
      method: 'post',
      data
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

// get方法
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.CENTER_API + url,
      method: 'get',
      params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
