import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
// import { h } from 'snabbdom/h' // helper function for creating vnodes
import h from './vnode/h.js' // helper function for creating vnodes

import patch from './vnode/patch.js'
// const patch = init([
//     classModule,
//     propsModule,
//     styleModule,
//     eventListenersModule,
// ])
// console.log('patch', patch)
const container = document.getElementById('container')
const btn = document.getElementById('btn')
const ulNode = h('ul', { key: 'ul' }, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
])

patch(container, ulNode)

const newUlNode = h('ul', { key: 'ul' }, [
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'Dd'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'A' }, 'AAAA'),
])

btn.addEventListener('click', () => {
    patch(ulNode, newUlNode)
})
