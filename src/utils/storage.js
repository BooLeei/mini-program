import wepy from 'wepy'

export function Get(key = '') {
    return new Promise((resolve, reject) => {
        wepy.getStorage({
            key: key,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Set(key, value) {
    return new Promise((resolve, reject) => {
        wepy.setStorage({
            key: key,
            data: value,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Remove(key) {
    return new Promise((resolve, reject) => {
        wepy.removeStorage({
            key: key,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function clear() {
    return Promise.resolve(wepy.clearStorage())
}
