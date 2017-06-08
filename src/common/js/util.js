export function deepClone (src) {
  let ret = {}
  for (let k in src) {
    ret[k] = typeof src[k] === 'object' ? deepClone(src[k]) : src[k]
  }
  return ret
}
