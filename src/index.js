const appStore = {
    title: {
        text: 'React.js 小书',
        color: 'red'
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}

function renderApp(appStore) {
    renderTitle(appStore.title)
    renderContent(appStore.content)
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

function stateChanger(action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appStore.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appStore.title.color = action.color
            break
        default:
            break
    }
}

function createStore(state, stateChange) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        "use strict";
        stateChange(action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}

const store = createStore(appStore, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState())
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' })
store.dispatch({ type: 'UPDATE_TITLE_TEXT', color: 'green' })