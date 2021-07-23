export const def = function (obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: enumerable,
    })
}
