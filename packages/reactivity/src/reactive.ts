import { getActiveEffect } from "./effect";

let bucket = new Set();
export function reactive(target: object) {
  const obj = new Proxy(target, {
    get(target, key) {
      //需要知道effect干了啥
      bucket.add(getActiveEffect());
      return target[key];
    },
    set(target, key, val) {
      target[key] = val;
      bucket.forEach(fn => fn());
      return true
    },
  });
  return obj;
}
