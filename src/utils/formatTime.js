let formatDay = (time, daySplit = '-') => {
    time = time.length < 13 ? Number.parseInt(time) * 1000 : Number.parseInt(time)
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()
    return `${year}${daySplit}${month}${daySplit}${day}`
}
let formatSecond = (time, daySplit = '-', timeSplit = ':') => {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let min = date.getMinutes() < 10 ? '0' + date.getHours() : date.getHours()
    let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return `${year}${daySplit}${month}${daySplit}${day} ${hour}${timeSplit}${min}${timeSplit}${sec}`
}

export {formatDay, formatSecond}
