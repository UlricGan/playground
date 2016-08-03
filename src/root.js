import React from 'react'
import { Router, RouterContext } from 'react-router'
import { Provider } from 'react-redux'

export default (props) => {
	const {
		history,
		routes,
		type,
		renderProps,
		store,
	} = props

	return (
		<Provider store={store}>
			{type === 'server' ?
				<RouterContext {...renderProps} /> :
				<Router history={history} routes={routes} />
			}
		</Provider>
	)
}