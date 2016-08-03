import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware()
	const middlewares = applyMiddleware(sagaMiddleware, thunk)
	//const devtool = (process.env.NODE_ENV !== 'production' && window && window.devToolsExtension) ? window.devToolsExtension() : f => f

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			middlewares,
			//devtool
		)
	)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./rootReducer', () => {
			const nextRootReducer = require('./rootReducer').default
			store.replaceReducer(nextRootReducer)
		})
	}

	store.runSaga = sagaMiddleware.run
	store.close = () => store.dispatch(END)
	return store
}