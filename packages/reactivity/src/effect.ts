// export function getActiveEffect() {
//     return activeEffect
// }
let activeEffect = null
export function effect(fn) {
    activeEffect = fn
    fn() // fn内部会触发get
}

const targetMap = new WeakMap()

// {
//     target: { key: [effect1, effect2]}
// }

export function track (target, type, key) {
    // body
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps) {
        deps = new Set()
    }
    if(activeEffect) {
        deps.add(activeEffect)
    }
    depsMap.set(key, deps)
}

export function trigger (target, type, key, val) {
    // body
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        return
    }
    let deps = depsMap.get(key)
    if(!deps) {
        return
    }
    deps.forEach(effect => effect())
}

