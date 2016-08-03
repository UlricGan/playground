import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import Root from './root'
import createRoutes from './routes'
import configureStore from './store/configureStore'
import rootSaga from './store/rootSaga'
import { fromJS } from 'immutable'
import './index.css'

function convert(state) {
	return Object.keys(state).reduce((res, item) => {
		return { ...res, [item]: fromJS(state[item])}
	}, {})
}

const routes = createRoutes()
const store = configureStore(convert(window.__INITIAL_STATE__))
store.runSaga(rootSaga)

ReactDOM.render(
  <Root
  	history={browserHistory}
  	store={store}
  	routes={routes}
  />,
  document.getElementById('root')
)
