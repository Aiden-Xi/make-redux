// const appState = {
//     title: {
//         text: 'React.js 小书',
//         color: 'red',
//     },
//     content: {
//         text: 'React.js 小书内容',
//         color: 'blue'
//     }
// }
//
// function renderApp(appState) {
//     renderTitle(appState.title)
//     renderContent(appState.content)
// }
//
// function renderTitle(title) {
//     const titleDOM = document.getElementById('title')
//     titleDOM.innerHTML = title.text
//     titleDOM.style.color = title.color
// }
//
// function renderContent(content) {
//     const contentDOM = document.getElementById('content')
//     contentDOM.innerHTML = content.text
//     contentDOM.style.color = content.color
// }
//
// function stateChanger(state, action) {
//     console.log(`state = ${state}-------action = ${action}`)
//     switch (action.type) {
//         case 'UPDATE_TITLE_TEXT':
//             console.log('修改小书的标题')
//             state.title.text = action.text
//             break
//         case 'UPDATE_TITLE_COLOR':
//             console.log('修改小书的标题颜色')
//             state.title.color = action.color
//             break
//         default:
//             break
//     }
// }
//
// // 监听者模式 - 自动刷新数据变化之后的页面
// function createStore(state, stateChanger) {
//     const listeners = []
//     const subscribe = (listener) => listeners.push(listener)
//     // function subscribe(listener) {
//     //     listeners.push(listener)
//     // }
//     const getState = () => state
//     const dispatch = (action) => {
//         stateChanger(state, action)
//         listeners.forEach((listener) => listener())
//     }
//     return { getState, dispatch, subscribe }
// }
//
// const store = createStore(appState, stateChanger)
// // 将更新函数添加到subscribe中， 然后在数据更新的时候，会依次执行监听数组里面的函数
// store.subscribe(() => renderApp(store.getState()))
//
// // 首次渲染页面
// renderApp(store.getState())
// store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
// store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' })
//

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import './index.css'


// 监听者模式 - 自动刷新数据变化之后的页面
function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    // 初始化数据
    dispatch({})

    return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
    if (!state) return { themeColor: 'red' }

    switch(action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor }
        default:
            return state
    }
}

const store = createStore(themeReducer)

class Index extends Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return { store }
    }

    render() {
        return(
            <div>
                <Header/>
                <Content/>
            </div>
        )
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
)