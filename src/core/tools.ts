/**
     * 将驼峰命名法的属性名转换为短横线，用于样式名称的转换
     * @param name 属性名
     */
export function convertCSSPropertyName(name: string) {
    const prefixes = ['webkit', 'moz', 'ms']
    let rst = name.replace(/([A-Z])/gs, (text) => {
        return `-${text.toLowerCase()}`
    })
    if (rst.startsWith('-'))
        rst = rst.split("").toSpliced(0, 1).join("")
    prefixes.forEach(i => {
        if (rst.startsWith(i)) {
            rst = "-" + rst
        }
    })
    return rst
}