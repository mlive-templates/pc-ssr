exports.answer = function (success, msg, data) {
    return {
        success: success,
        msg: msg.toString(),
        data: data
    }
}
/**
 * 返回当前时间，10位，忽略毫秒
 */
exports.getCurTime = function () {
    const date = new Date()
    return (date.valueOf() + '').slice(0, 10) - 0
}
exports.formateDate = function (time, style, diff) {
    // 如果传入的是时间戳，必须是number类型，否则报错
    const d = diff || 0
    const date = new Date(new Date(time).getTime() + d * (1000 * 60 * 60 * 24))
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const db = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        mm: ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
        d: date.getDate(),
        dd: (date.getDate() < 10 ? '0' : '') + date.getDate(),

        _h: date.getHours(),
        _hh: (date.getHours() < 10 ? '0' : '') + date.getHours(),
        _m: date.getMinutes(),
        _mm: (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        _s: date.getSeconds(),
        _ss: (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),

        lastDay: null,
        w: weekDay[date.getDay()],
        week: date.getDay(),
        time: date.getTime(),
        string: ''
    }
    let nextMonthDay1
    if (db.m + 1 > 12) {
        nextMonthDay1 = new Date((db.y + 1) + '/01/1')
    } else {
        nextMonthDay1 = new Date(db.y + '/' + (db.m + 1) + '/1')
    }
    // 本月末 = 下月初1-1000毫秒
    db.lastDay = (new Date(nextMonthDay1.getTime() - 1000)).getDate()
    if (style && style.indexOf('yy/mm/dd') > -1) {
        db.string = db.y + '/' + db.mm + '/' + db.dd
    } else if (style && style.indexOf('yymmdd') > -1) {
        db.string = db.y + '' + db.mm + '' + db.dd
    } else if (style && style.indexOf('yy-mm-dd') > -1) {
        db.string = db.y + '-' + db.mm + '-' + db.dd
    } else {
        db.string = db.y + '/' + db.m + '/' + db.d
    }
    if (style && style.indexOf('hh:mm:ss') > -1) {
        db.string += ' ' + db._hh + ':' + db._mm + ':' + db._ss
    }
    return db
}