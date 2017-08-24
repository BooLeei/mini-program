import wepy from 'wepy'
import { SOCKET_URL } from './constants'

export function Create (data = {}) {
    return new Promise((resolve, reject) => {
        wepy.connectSocket({
            url: SOCKET_URL,
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Init (userId = '') {
    return new Promise((resolve, reject) => {
        wepy.sendSocketMessage({
            data: `tp=add&f=${userId}`,
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Send ({content = '', userId = '', chatId = '', groupId = ''}) {
    return new Promise((resolve, reject) => {
        wepy.sendSocketMessage({
            data: `tp=msg&c=${content}&t=${chatId}&f=${userId}&gid=${groupId}`,
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export function Receive () {
    return new Promise((resolve, reject) => {
        wepy.onSocketMessage(res => {
            console.log(res)
            resolve(res)
        })
    })
}

export function OnOpen () {
    return new Promise((resolve, reject) => {
        wepy.onSocketOpen(res => {
            resolve(res)
        })
        wepy.onSocketError(err => {
            reject(err)
        })
    })
}

export function OnClose () {
    return new Promise((resolve, reject) => {
        wepy.onSocketClose(res => {
            resolve(res)
        })
    })
}

export function Close () {
    return new Promise((resolve, reject) => {
        wepy.closeSocket({
            success: ret => {
                resolve(ret)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}
