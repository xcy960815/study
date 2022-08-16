import vnode from './vnode.js'

export default function (sel, data, params) {
    if (arguments.length !== 3) {
        throw new Error('params error')
    }
    if (typeof params === 'string' || typeof params === 'number') {
        // sel, data, children, text, elm
        return vnode(sel, data, undefined, params, undefined)
    } else if (Array.isArray(params)) {
        const children = []
        // 如果第三个参数为数组
        for (let i = 0; i < params.length; i++) {
            const child = params[i]
            children.push(child)
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof params === 'object' && params.hasOwnProperty('sel')) {
        const children = [params]
        return vnode(sel, data, children, undefined, undefined)
    }
}
