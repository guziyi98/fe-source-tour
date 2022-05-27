// import { getActiveEffect } from "./effect";
import { mutableHandler, shallowReactiveHandlers } from './baseHandlers'


export const reactiveMap = new WeakMap()
// 代理对象 => 原始对象的缓存

export function reactive(target) {
  // 如果reactive调用多次
  return createReactiveObject(target, reactiveMap, mutableHandler)
}

// 浅层的reactive
export function shallowReactive(target) {
  createReactiveObject
}

function createReactiveObject(target, proxyMap, proxyHandlers) {
  if(typeof target !== 'object') {
    console.warn('target必须是对象')
    return target
  }
  const existingProxy = proxyMap.get(target)
  if(existingProxy){
    return existingProxy
  }
  const proxy = new Proxy(target, proxyHandlers)
  proxyMap.set(target, proxy)
  return proxy
}

// let bucket = new Set();
// export function reactive(target: object) {
//   const obj = new Proxy(target, {
//     get(target, key) {
//       //需要知道effect干了啥
//       bucket.add(getActiveEffect());
//       return target[key];
//     },
//     set(target, key, val) {
//       target[key] = val;
//       bucket.forEach(fn => fn());
//       return true
//     },
//   });
//   return obj;
// }
