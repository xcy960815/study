import Dep from './Dep.js'
let uid = 0
function parsePath(expression) {
    const segments = expression.split('.')
    return (obj) => {
        for (let index = 0; index < segments.length; index++) {
            if (!obj) return
            const key = segments[index]
            obj = obj[key]
        }
        return obj
    }
}

export default class Watcher {
    constructor(target, expression, callback) {
        this.id = uid++
        this.target = target
        this.getter = parsePath(expression) //得到的是一个函数
        this.callback = callback
        this.value = this.get()
    }

    addDep(dep) {
        dep.addSub(this)
    }
    get() {
        // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
        Dep.target = this
        const target = this.target
        let value
        // 只要能找，就一直找
        try {
            value = this.getter(target)
        } finally {
            Dep.target = null
        }

        return value
    }
    update() {
        // this.run()
        this.getAndInvoke(this.callback)
    }
    // run() {
    //     this.getAndInvoke(this.callback)
    // }
    getAndInvoke(callback) {
        const newValue = this.getter(this.target)

        if (newValue !== this.value || typeof newValue == 'object') {
            // 记录老数据
            const oldValue = this.value

            this.value = newValue

            callback.call(this.target, newValue, oldValue)
        }
    }
}
