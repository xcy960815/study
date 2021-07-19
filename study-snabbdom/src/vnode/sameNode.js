// 判断两个vnode 是不是相同的vnode
export default function (firstNode, secondNode) {
    // console.log('firstNode', firstNode)
    // console.log('secondNode', secondNode)
    if (firstNode && secondNode) {
        return (
            firstNode.sel === secondNode.sel && firstNode.key === secondNode.key
        )
    }
}
