import parseAttrs from './parse-attrs.js'

export default function (templateString) {
    // 指针
    let index = 0
    // 剩余的字符串模版
    let restTemplate = templateString
    // 识别开始标签的正则
    const startRegExp = /^<([a-z]+[1-6]?)(\s?[^>]*)>/
    // 识别结束标签的正则
    const endRegExp = /^<\/([a-z]+[1-6]?)>/
    // 识别内容的正则
    const contentRegExp = /^([^<]+)<\/[a-z]+[1-6]?>/
    // 标签栈
    const tagStack = []
    // 内容栈
    const contentStack = [{ children: [] }]
    while (index < templateString.length - 1) {
        // 实时更新剩余的字符串
        restTemplate = templateString.substring(index)
        // console.log('restTemplate', restTemplate)
        // 思路：识别当前剩余字符串的开头位置
        // 1、遇到开始标签 就进栈
        // 2、遇到结束标签就出栈
        if (startRegExp.test(restTemplate)) {
            // 标签
            const startTag = restTemplate.match(startRegExp)[1]
            // 标签上的属性 比如 class id
            const arrts = restTemplate.match(startRegExp)[2]

            // 将标签放到标签栈中
            tagStack.push(startTag)
            // 将与此标签相关的属性放到内容栈当中
            contentStack.push({
                tag: startTag,
                type: 1,
                arrts: parseAttrs(arrts),
                children: [],
            })

            index += startTag.length + arrts.length + 2 //+2的原因是标签左右有<>两个符号，当开始标签处理完之后index下标就需要加2
        } else if (endRegExp.test(restTemplate)) {
            // 结束标签
            const endTag = restTemplate.match(endRegExp)[1]
            // 判断当前的闭合标签和上一次添加的开始标签是不是同一标签，如果不是 就说明标签没有闭合，此处不做单标签的处理
            const startTag = tagStack[tagStack.length - 1]
            if (startTag === endTag) {
                // 标签栈弹栈，最后一个标签已经完成任务
                tagStack.pop() //弹出最后一个进去的标签

                const contentStackOption = contentStack.pop()
                contentStack[contentStack.length - 1].children.push(
                    contentStackOption
                )
                index += endTag.length + 3 //加3的原因是闭合标签有</闭合标签的长度>
            } else {
                throw new Error(`${startTag}标签没有闭合`)
            }
        } else if (contentRegExp.test(restTemplate)) {
            const content = restTemplate.match(contentRegExp)[1]
            const reg = /^\s+$/ //空正则验证 过滤掉空格的情况
            if (!reg.test(content)) {
                contentStack[contentStack.length - 1].children.push({
                    text: content,
                    type: 3,
                })
            }

            index += content.length
        } else {
            index++
        }
    }
    // console.log(contentStack[0].children[0])
    return contentStack[0].children[0]
}
