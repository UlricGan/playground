require('babel-register')()
var hook = require('css-modules-require-hook')
hook({
	generateScopedName: '[local]___[hash:base64:5]',
})