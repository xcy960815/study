import createElement from './create-element'
import updateChildren from './update-children'

export default function (oldVNode, newVNode) {
    // 判断新旧vnode是否是同一个对象
    if (oldVNode === newVNode) return
    // 如果新节点中存在text 并且老节点的children 属性不存在 那就更新oldVNode节点中的text 属性
    if (newVNode.text && (!oldVNode.children || oldVNode.children === 0)) {
        if (newVNode.text !== oldVNode.text) {
            oldVNode.elm.innerHTML = newVNode.text
        }
    } else {
        if (
            (!oldVNode.children || !oldVNode.children.length) &&
            newVNode.children &&
            newVNode.children.length
        ) {
            oldVNode.elm.innerHTML = '' // 因为appendChild 不能清空原来的内容 所以要执行下  oldVNode.elm.innerHTML = ''
            for (let index = 0; index < newVNode.children.length; index++) {
                const childNode = createElement(newVNode.children[index])
                oldVNode.elm.appendChild(childNode)
            }
        } else if (
            oldVNode.children &&
            oldVNode.children.length &&
            newVNode.children &&
            newVNode.children.length
        ) {
            updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
        }
    }
}
