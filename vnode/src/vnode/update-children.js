import sameNode from './same-node'
import patchVNode from './patch-vnode'
import createElement from './create-element'
export default function updateChildren(parentElm, oldVNodes, newVNodes) {
    // 旧的开始下标
    let oldStartIdx = 0
    // 新的开始下标
    let newStartIdx = 0
    // 旧的结束下标
    let oldEndIdx = oldVNodes.length - 1
    // 新的结束下标
    let newEndIdx = newVNodes.length - 1
    // 旧的开始节点
    let oldStartVnode = oldVNodes[0]
    // 旧的结束节点
    let oldEndVnode = oldVNodes[oldEndIdx]
    // 新的开始节点
    let newStartVnode = newVNodes[0]
    // 新的结束节点
    let newEndVnode = newVNodes[newEndIdx]

    const keyMap = {}

    while (oldStartIdx <= oldEndIdx && newStartIdx <= oldEndIdx) {
        if (!newStartVnode) {
            //不用处理节点不存在的情况
            newStartVnode = newVNodes[++newStartIdx]
        } else if (!newEndVnode) {
            //不用处理节点不存在的情况
            newEndVnode = newVNodes[++newEndIdx]
        } else if (!oldStartVnode) {
            //不用处理节点不存在的情况
            oldStartVnode = oldVNodes[++oldStartIdx]
        } else if (!oldEndVnode) {
            //不用处理节点不存在的情况
            oldEndVnode = oldVNodes[--oldEndIdx]
        } else if (sameNode(oldStartVnode, newStartVnode)) {
            console.log('命中1这种情况')
            // 新前与旧前
            patchVNode(oldStartVnode, newStartVnode)
            oldStartVnode = oldVNodes[++oldStartIdx]
            newStartVnode = newVNodes[++newStartIdx]
        } else if (sameNode(oldEndVnode, newEndVnode)) {
            console.log('命中2这种情况')
            // 新后与旧后
            patchVNode(oldEndVnode, newEndVnode)
            oldEndVnode = oldVNodes[--oldEndIdx]
            newEndVnode = newVNodes[--newEndIdx]
        } else if (sameNode(oldStartVnode, newEndVnode)) {
            console.log('命中3这种情况')
            // 新后与旧前
            patchVNode(oldStartVnode, newEndVnode)
            // 移动节点 新前节点移动到jiu hou
            parentElm.insertBefore(
                oldStartVnode.elm,
                oldEndVnode.elm.nextSibling
            )
            oldStartVnode = oldVNodes[++oldStartIdx]
            newEndVnode = newVNodes[--newEndIdx]
        } else if (sameNode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            patchVNode(oldEndVnode, newStartVnode)
            // 移动节点
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldVNodes[--oldEndIdx]
            newEndVnode = newVNodes[--newEndIdx]
        } else {
            // 当前面四种情况都不符合的情况下
            if (JSON.stringify(keyMap) === '{}') {
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const oleNodeKey = oldVNodes[i].key
                    if (oleNodeKey) {
                        keyMap[oleNodeKey] = i
                    }
                }
            }

            const idxInOld = keyMap[newStartVnode.key]

            if (idxInOld === undefined) {
                // 判断，如果idxInOld是undefined 表示它是全新的项
                parentElm.insertBefore(
                    createElement(newStartVnode), // 被加入的项（就是newStartVnode这项）现在不是真实的DOM
                    oldStartVnode.elm
                )
            } else {
                // 判断，如果idxInOld不是undefined 表示它不是全新的项，需要移动
                const elmToMove = oldVNodes[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                // 把这项设置为undefined，表示已经处理完了
                oldVNodes[idxInOld] = undefined
                // 移动，调用insertBefore
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            // 指针下移，只移动新的头
            newStartVnode = newVNodes[++newStartIdx]
        }
    }
    // 继续看看有没有剩余的 循环结束了 newStartIdx 还是比 newEndIdx 小
    if (newStartIdx <= newEndIdx) {
        // newVNodes这里还有剩余节点没有处理
        // 插入的标杆
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore 可以自动识别 null，如果是 null 就会自动排到队尾去。和appendChild是一致的
            parentElm.insertBefore(
                createElement(newVNodes[i]), // newVNodes[i] 还不是真正的DOM，所以需要此处需要调用createElement
                oldVNodes[oldStartIdx].elm
            )
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // old这里还有剩余节点没有处理
        // 批量删除oldStartIdx~oldEndIdx之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            const oldNode = oldVNodes[i]
            if (oldNode && oldNode.elm) {
                parentElm.removeChild(oldNode.elm)
            }
        }
    }
}
