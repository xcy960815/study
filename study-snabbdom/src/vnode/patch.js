import sameNode from './sameNode.js'
import createElement from './createElement.js'
import vnode from './vnode.js'
import patchVNode from './patchVNode.js'
export default function patch(oldVNode, newVNode) {
    // 判断oldVNode 是不是 真实dom 如果是 将真实dom变成 虚拟dom
    if (!oldVNode.hasOwnProperty('sel') && oldVNode.sel !== '') {
        // sel, data, children, text, elm, key
        oldVNode = vnode(
            oldVNode.tagName.toLowerCase(),
            {},
            [],
            undefined,
            oldVNode,
            undefined
        )
    }

    if (sameNode(oldVNode, newVNode)) {
        // 如果是同一个节点 就要查看节点内部了
        patchVNode(oldVNode, newVNode)
    } else {
        const newNode = createElement(newVNode)
        oldVNode.elm.parentNode.insertBefore(newNode, oldVNode.elm)
        // 插入完成之后删掉原来的老节点
        oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
}
