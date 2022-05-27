import { describe, it, expect, vi} from 'vitest'

import { reactive, effect } from '../src'

describe('响应式测试', () => {
    let obj = reactive({
        name: 'gzy'
    })
    let dummy
    effect(() => {
        dummy = obj.name
    })
    expect(dummy).toBe('gzy')
    obj.name = 'gzy2'
    expect(dummy).toBe('gzy2')

    obj.name = '哈哈'
    expect(dummy).toBe('哈哈')
    
    // 玩具 => 真正可用需要经历的步骤  各种边缘的场景
    it('响应式系统分支切换', () => {
        let obj = reactive({
            Text: 'gzy',
            ok: true
        })
        let message
        let fn = vi.fn(() => {
            message = obj.ok ? obj.text : '没有'

        })
        effect(fn)
        expect(fn).toHaveBeenCalledTimes(1)
        effect(() => {
            message = obj.ok ? obj.text : '没有'
        })
        expect(message).toBe('gzy')
        obj.ok = false

    })
})