import moment from 'moment'

const TIME_FORMAT_PATTERN1 = "YYYY年MM月DD日";
const TIME_FORMAT_PATTERN2 = "YYYY-MM-DD";
const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];


/**
 * 格式化当前时间
 * @param pattern 时间格式
 * @returns string 格式化后的时间
 */
function getNow(pattern) {
    return moment().format(pattern)
}

/**
 * 获取当前星期几
 * @returns string 格式化后的时间
 */
function getCurrentWeekDay() {
    return WEEK[moment().format('d')]
}

/**
 * 格式化指定日期
 * @param time 被格式化的日期
 * @param pattern 格式
 */
function formatTime(time, pattern) {
    return moment(time).format(pattern);
}

/**
 * 将标准时间格式化为口语时间
 * @param  time 标准格式时间
 */
function formatDailyTime(time) {
    return moment(time).fromNow(moment(), moment.updateLocale('en', {
        relativeTime: {
            s: "刚刚",
            m: "刚刚",
            mm: "%d分钟前",
            h: "1小时前",
            hh: "%d小时前",
            d: "1天前",
            dd: "%d天前",
            M: "1月前",
            MM: "%d月前",
            y: "1年前",
            yy: "%d年前"
        }
    }))
}

/**
 * 格式化diycode接口时间为口语时间
 * @param time 
 */
function formatDiyCodeDailyTime(time) {
    let tmp = time.substring(0, 19).replace("T", " ");
    return formatDailyTime(tmp)
}

export {
    getNow,
    getCurrentWeekDay,
    formatTime,
    formatDailyTime,
    formatDiyCodeDailyTime,
    TIME_FORMAT_PATTERN1,
    TIME_FORMAT_PATTERN2
}