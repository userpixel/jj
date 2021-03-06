export const INDENT = '    '
export const NEWLINE = '\n'

export function isArr(x) {
    return Array.isArray(x)
}

export function arrFrom(x) {
    return Array.from(x)
}

export function toArray(a) {
    return isArr(a) ? a : [a]
}

export function ind(indentation, addition = 0) {
    if (indentation < 0) {
        return ''
    }
    indentation += addition
    if (ind.cache[indentation] === undefined) {
        ind.cache[indentation] = INDENT.repeat(indentation)
    }
    return ind.cache[indentation]
}
ind.cache = ['', INDENT]

export function nl(indentation) {
    return indentation < 0 ? '' : NEWLINE
}

export function mapKeyVal(obj, fn) {
    return Object.entries(obj).map(([k, v]) => fn(k, v, obj))
}

export function isObj(a) {
    return a && typeof a === 'object'
}

export function isStr(a, minLength = 0) {
    return typeof a === 'string' && a.length >= minLength
}

export function isNum(a) {
    return typeof a === 'number' && Number.isFinite(a)
}

export function isFn(a) {
    return typeof a === 'function'
}

export function isBool(a) {
    return typeof a === 'boolean'
}

export function isDef(a) {
    return a !== undefined
}

export function camel2kebab(str) {
    return str.replace(/([A-Z])/g, ch => '-' + ch.toLowerCase())
}

export function cssValue(v) {
    if (isArr(v)) {
        return v.join(' ')
    }
    return v
}

function embed(start, end, ...contents) {
    return start + contents.join('') + end
}

export function par(...strArr) {
    return embed('(', ')', ...strArr)
}

export function qut(...strArr) {
    const str = strArr.join('').replace('"', '\\"')
    return embed('"', '"', str)
}

export function ent(entity) {
    if (isStr(entity)) {
        return '&' + entity + ';'
    } else if (isNum(entity) && Number.isInteger(entity)) {
        return `&#${entity};`
    }
    throw new TypeError(`Cannot make HTML entity from ${entity}`)
}

export function sqBra(...strArr) {
    return embed('[', ']', ...strArr)
}

export function rnd(prefix) {
    const randomStr = Math.random().toString(36).substr(2)
    // the resulting string should always start with a letter, otherwise it won't work as class or id
    return isStr(prefix) ? `${prefix}-${randomStr}` : randomStr
}

export function alias(obj, aliasDic) {
    const prt = obj.prototype

    function assignTarget(dst, src) {
        if (prt[dst] !== undefined) {
            throw new Error(`${obj.name} already has a method called ${dst}`)
        }
        prt[dst] = prt[src]
    }

    mapKeyVal(aliasDic, (src, dst) => {
        if (isArr(dst)) {
            dst.forEach(d => assignTarget(d, src))
        } else {
            assignTarget(dst, src)
        }
    })
}

const ranOnce = Symbol('ran once flag')
export function runOnce(fn, ...args) {
    if (isFn(fn) && !fn[ranOnce]) {
        fn.apply(undefined, args)
        fn[ranOnce] = true
    }
}

export const doc = {
    el(tagName, ns) {
        return isStr(ns) ? document.createElementNS(ns, tagName) : document.createElement(tagName)
    },
    frag() {
        return document.createDocumentFragment()
    },
    text(...strArr) {
        return document.createTextNode(String(strArr.flat().join('')))
    },
    comm(...strArr) {
        return document.createComment(String(strArr.flat().join('')))
    },
    get body() {
        return document.body
    },
    get head() {
        return document.body.head
    },
}

export function isComponent(obj) {
    return isObj(obj) && isObj(obj.root)
}
