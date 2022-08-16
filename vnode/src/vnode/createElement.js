export default function createElement(vnode) {
    const sel = vnode.sel
    const dom = document.createElement(sel)
    // 判断 vnode 的text属性和children属性 二者必有一个
    const text = vnode.text
    const children = vnode.children
    if (text) {
        dom.innerHTML = text
    } else if (Array.isArray(children) && children.length > 0) {
        dom.innerHTML = ''
        for (let i = 0; i < children.length; i++) {
            const childVNode = children[i]
            const childNode = createElement(childVNode)
            dom.appendChild(childNode)
        }
    }
    vnode.elm = dom
    return vnode.elm
}
