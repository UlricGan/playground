import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, createMemoryHistory } from 'react-router'
import createRoutes from './routes'
import Root from './root'
import _ from 'lodash'
import configureStore from './store/configureStore'
import rootSaga from './store/rootSaga'

const mapAssets = (generate) => (assetsConfig) => {
	const links = _.map(assetsConfig, (file) => {
		return generate(file)
	})

	return links.join('')
}

const generateScripts = mapAssets((file) => {
	if (!file.js) return ''
	return `<script src="${file.js}"></script>`
})

const generateCss = mapAssets((file) => {
	if (!file.css) return ''
	return `<link rel="stylesheet" href="${file.css}"></link>`
})

var assetsConfig = require('./assets.json')

const routes = createRoutes()
const layout = (body, initialState) => (`
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8"/>
		<title>playground</title>
		${generateCss(assetsConfig)}
	</head>
	<body>
		<div id="root">${body}</div>
		<script type="text/javascript" charset="utf-8">
			window.__INITIAL_STATE__ = ${initialState};
		</script>
		${generateScripts(assetsConfig)}
	</body>
	</html>
`)

export default function(req, res) {

	const store = configureStore()

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps && renderProps.components) {

			const rootComp = (
				<Root
					store={store}
					routes={routes}
					history={createMemoryHistory()}
					renderProps={renderProps}
					type="server"
				/>
			)

			store.runSaga(rootSaga).done.then(() => {
				res.status(200).send(
					layout(
						renderToString(rootComp),
						JSON.stringify(store.getState())
					)
				)
			}).catch((err) => {
				console.error(err.message)
				res.status(500).send(err.message)
			})

			//res.status(200).send(layout(renderToString(rootComp), JSON.stringify({})))
			store.close()
		} else {
			res.status(400).send('Not Found')
		}
	})
}