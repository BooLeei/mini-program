import wepy from 'wepy'
import { UPLOAD_URL } from './constants'

export function Choose (num = 1) {
    return new Promise((resolve, reject) => {
        wepy.chooseImage({
            count: num,
            sizeType: 'origin',
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Upload(file, type, progess, name = 'file') {
    return new Promise((resolve, reject) => {
        wepy.uploadFile({
            url: UPLOAD_URL,
            name: name,
            filePath: file,
            formData: {
                'type': type
            },
            success: res => {
                let ret = JSON.parse(res.data)
                if (Number.parseInt(ret.err) !== 0) {
                    reject(ret.errmsg)
                } else {
                    resolve(ret)
                }
            },
            fail: err => {
                reject(err)
            }
        })
        // if (uploadTask) {
        // uploadTask.onProgressUpdate((progress, loaded, total) => {
        //     if (typeof progress === 'function') {
        //         progess(progress, loaded, total)
        //     }
        // })
        // } else {
        //     wepy.showModal({
        //         title: '提示',
        //         content: '当前版本过低，无法查看上传进度，请升级到最新微信版本后重试'
        //     })
        // }
    })
}

export function Preview (index, arr) {
    return new Promise((resolve, reject) => {
        wepy.previewImage({
            current: arr[index],
            urls: arr,
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}
