// get set delete

import { track, trigger } from './effect'
function get (target, key) {
    // body
    track(target, 'get', key)
    return target[key]
}

function set (target, key, val) {
    // body
    target[key] = val
    trigger(target, 'set', key, val)
    return true
}

export const mutableHandler = {
    get,
    set,
}

export const shallowReactiveHandlers = {
    
}