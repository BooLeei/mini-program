import wepy from 'wepy'
import { SERVICE_URL } from '../utils/constants'

export default class Request {
    Get (params, path) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: SERVICE_URL + path,
                data: params,
                method: 'GET',
                success: ret => {
                    if (Number.parseInt(ret.data.err) === 0) {
                        resolve(ret.data)
                    } else {
                        reject(ret)
                    }
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    }

    Post (data, path) {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: SERVICE_URL + path,
                data: data,
                method: 'POST',
                success: ret => {
                    if (Number.parseInt(ret.data.err) === 0) {
                        resolve(ret.data)
                    } else {
                        reject(ret)
                    }
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    }

    special (params, path, method = 'GET') {
        return new Promise((resolve, reject) => {
            wepy.request({
                url: SERVICE_URL + path,
                data: params,
                method: method,
                success: ret => {
                    resolve(ret.data)
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    }
}
