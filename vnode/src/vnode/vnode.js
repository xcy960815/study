// 所谓的虚拟dom 就是一个可以描述节点关系的 js对象
export default function vnode(sel, data, children, text, elm) {
    const key = data === undefined ? undefined : data.key
    return { sel, data, children, text, elm, key }
}
