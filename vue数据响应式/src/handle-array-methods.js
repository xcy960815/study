import { def } from './utils'

// 记录所有的数组方法
const arrayProtoType = Array.prototype
export const arrayMethods = Object.create(arrayProtoType)
// 需要被拦截的7个数组方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
]

// 遍历被拦截的数组方法

methodsNeedChange.forEach((method) => {
    // 记录原来的数组方法
    const original = methodsNeedChange[method]

    def(
        arrayMethods,
        method,
        function () {
            const result = original.apply(this, arguments)
            const ob = this.__ob__

            let insert = []

            const arg = [...arguments]
            switch (method) {
                case 'push':
                case 'unshift':
                    insert = arg
                    break

                case 'splice':
                    insert = arg.slice(2)
            }
            const observeArray = ob.observeArray

            if (insert) {
                observeArray(insert)
            }

            ob.dep.notify()

            return result
        },
        false
    )
})
