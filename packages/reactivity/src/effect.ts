 let activeEffect = null
export function getActiveEffect() {
    return activeEffect
}
export function effect(fn) {
    activeEffect = fn
    fn() // fn内部会触发get
}

