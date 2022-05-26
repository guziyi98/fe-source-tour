import { describe, it, expect} from 'vitest'

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
    
})