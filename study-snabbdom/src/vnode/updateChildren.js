import sameNode from './sameNode'
import patchVNode from './patchVNode'
import createElement from './createElement'
export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧的开始下标
    let oldStartIdx = 0
    // 新的开始下标
    let newStartIdx = 0
    // 旧的结束下标
    let oldEndIdx = oldCh.length - 1
    // 新的结束下标
    let newEndIdx = newCh.length - 1
    // 旧的开始节点
    let oldStartVnode = oldCh[0]
    // 旧的结束节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新的开始节点
    let newStartVnode = newCh[0]
    // 新的结束节点
    let newEndVnode = newCh[newEndIdx]

    const keyMap = {}
    while (oldStartIdx <= oldEndIdx && newStartIdx <= oldEndIdx) {
        if (!newStartVnode) {
            //不用处理节点不存在的情况
            newStartVnode = newCh[++newStartIdx]
        } else if (!newEndVnode) {
            //不用处理节点不存在的情况
            newEndVnode = newCh[++newEndIdx]
        } else if (!oldStartVnode) {
            //不用处理节点不存在的情况
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (!oldEndVnode) {
            //不用处理节点不存在的情况
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (sameNode(oldStartVnode, newStartVnode)) {
            console.log('命中1这种情况')
            // 新前与旧前
            patchVNode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameNode(oldEndVnode, newEndVnode)) {
            console.log('命中2这种情况')
            // 新后与旧后
            patchVNode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldStartVnode, newEndVnode)) {
            console.log('命中3这种情况')
            // 新后与旧前
            patchVNode(oldStartVnode, newEndVnode)
            // 移动节点 新前节点移动到jiu hou
            parentElm.insertBefore(
                oldStartVnode.elm,
                oldEndVnode.elm.nextSibling
            )
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameNode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            patchVNode(oldEndVnode, newStartVnode)
            // 移动节点
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else {
            // 当前面四种情况都不符合的情况下
            if (JSON.stringify(keyMap) === '{}') {
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const oleNodeKey = oldCh[i].key
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
                const elmToMove = oldCh[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                // 把这项设置为undefined，表示已经处理完了
                oldCh[idxInOld] = undefined
                // 移动，调用insertBefore
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            // 指针下移，只移动新的头
            newStartVnode = newCh[++newStartIdx]
        }
    }
    // 继续看看有没有剩余的 循环结束了 newStartIdx 还是比 newEndIdx 小
    if (newStartIdx <= newEndIdx) {
        // newCh这里还有剩余节点没有处理
        // 插入的标杆
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore 可以自动识别 null，如果是 null 就会自动排到队尾去。和appendChild是一致的
            parentElm.insertBefore(
                createElement(newCh[i]), // newCh[i] 还不是真正的DOM，所以需要此处需要调用createElement
                oldCh[oldStartIdx].elm
            )
        }
    } else if (oldStartIdx <= oldEndIdx) {
        // old这里还有剩余节点没有处理
        // 批量删除oldStartIdx~oldEndIdx之间的项
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            const oldNode = oldCh[i]
            if (oldNode && oldNode.elm) {
                parentElm.removeChild(oldNode.elm)
            }
        }
    }
}
