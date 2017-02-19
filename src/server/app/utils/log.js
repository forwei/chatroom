import {dateFormat} from './time'

export default function log(log, type = 'log') {

    if (typeof log == 'string') {
        console[type](`[${dateFormat('yyyy-MM-dd hh:mm:ss')}] [app] ${log}`)
    } else {
        console[type](log)
    }
}

export function debug(err) {

    if (process.env.NODE_ENV !== 'production') {
        log(err)
    } else {
        log(err.message)
    }
}