import Dep from './Dep.js'
import observe from './observe.js'

export default function defineReactive(data, key, value) {
    // 每个数据都要维护一个属于自己的数组，用来存放依赖自己的watcher
    const dep = new Dep()

    // 如果第三个参数不传递的话 就自己判断一下
    if (value === void 0) {
        value = data[key]
    }

    let childOb = observe(value)

    Object.defineProperty(data, key, {
        // 可枚举 可以for-in
        enumerable: true,
        // 可被配置，比如可以被delete
        configurable: true,
        get() {
            const watcher = Dep.target
            if (watcher) {
                dep.depend()
                // console.log('childOb', childOb)
                if (childOb) {
                    childOb.dep.depend()
                }
                // childOb.dep.depend()
            }
            return value
        },
        set(newValue) {
            if (value !== newValue) {
                value = newValue
                childOb = observe(value)
                // 触发依赖
                // 发布订阅模式，通知dep
                dep.notify()
            }
        },
    })
}
