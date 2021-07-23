// vue的核心原理 通过Object.defineProperty
// 对数据进行劫持，通过getter 向dep当中添加watcher，通过setter触发dep当中的watcher

import observe from './observe.js'
import Watcher from './Watcher.js'

const obj = {
    a: {
        m: {
            n: 5,
        },
    },
    b: 10,
    c: {
        d: {
            e: {
                f: 6666,
            },
        },
    },
    g: [22, 33, 44, 55],
}

observe(obj)

// new Watcher(obj, 'g', (newValue, oldValue) => {
//     // Watcher会提前算出g的值，在求值过程中触发get
//     console.log(
//         '★我是watcher，我在监控g',
//         `新数据${newValue}`,
//         `老数据${oldValue}`
//     )
// })
new Watcher(obj, 'g', (newValue, oldValue) => {
    // Watcher会提前算出a.m.n的值，在求值过程中触发get
    console.log('★我是watcher，我在监控a.m.n', newValue, oldValue)
})

obj.a.m.n = 88
// obj.a.m.n = 43
obj.g.push(66)
console.log(obj)
