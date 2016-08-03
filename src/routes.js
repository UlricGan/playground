import React from 'react'
import { Route } from 'react-router'
import App from './App'
import Test from './Test'

export default function createRoutes() {
	return (
		<Route>
			<Route path="/" component={App} />
			<Route path="/test" component={Test} />
		</Route>
	)
}