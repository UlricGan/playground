import serverRender from '../../src/server-render'
import express from 'express'

export default (app) => {

	app.use(express.static(__dirname + '/../../build'))
	app.get('*', serverRender)

}