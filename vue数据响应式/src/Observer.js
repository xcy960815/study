import { def } from './utils'
import defineReactive from './defineReactive'
import Dep from './Dep.js'
import { arrayMethods } from './handle-array-methods.js'
import observe from './observe.js'
export default class Observer {
    constructor(value) {
        // 每一个Observer的实例身上，都有一个dep
        this.dep = new Dep()
        // 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例
        def(value, '__ob__', this, false)
        // Observer类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
        // 检查它是数组还是对象
        if (Array.isArray(value)) {
            // 如果是数组，将这个数组的原型，指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods)
            // 让这个数组变的observe
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(value) {
        for (const key in value) {
            defineReactive(value, key)
        }
    }
    // 数组的特殊遍历
    observeArray(array) {
        for (let i = 0, l = array.length; i < l; i++) {
            const value = array[i]
            observe(value)
        }
    }
}
