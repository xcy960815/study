export default function (attrsSrting) {
    attrsSrting = attrsSrting.trim()
    if (!attrsSrting) return []
    // 断点下标
    let pointIndex = 0
    // 是否在引号当中
    let isInQuotationMarks = false
    const attrsArray = []
    const reg = /\s/
    for (let index = 0; index < attrsSrting.length; index++) {
        // 当前的value
        const currentString = attrsSrting[index]
        // 判断当前的value 是不是 " 若果是 isInQuotationMarks = !isInQuotationMarks
        if (currentString === '"') isInQuotationMarks = !isInQuotationMarks
        // 如果当前的value不在"里面且不为空
        if (isInQuotationMarks === false && reg.test(currentString)) {
            const attrs = attrsSrting.substring(pointIndex, index)
            // console.log('attrs', attrs)
            attrsArray.push(attrs)
            pointIndex = index
        }
    }
    // 通过for循环之后 后面还会遗留一个属性
    attrsArray.push(attrsSrting.substring(pointIndex))
    // console.log('attrsArray', attrsArray)
    // [k="v",k="v"]=>[{k:v},{k:v}]
    return attrsArray.map((item) => {
        // 根据等号拆分
        const itemMatch = item.match(/(.+)="(.+)"/)
        return {
            name: itemMatch[1],
            value: itemMatch[2],
        }
    })
}
