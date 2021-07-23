import Observer from './Observer.js'
/**
 * 给data中的每个元素递归添加__ob__属性
 * __ob__属性是Observer实例
 * @param {object} data
 * @returns
 */
export default function (data) {
    if (typeof data !== 'object') return
    let ob
    if (typeof data.__ob__ !== 'undefined') {
        ob = data.__ob__
    } else {
        ob = new Observer(data)
    }
    return ob
}
