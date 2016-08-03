var path = require('path')

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath)
}

module.exports = {
  appBuild: resolve('../build'),
  appFavicon: resolve('../favicon.ico'),
  appPackageJson: resolve('../package.json'),
  appSrc: resolve('../src'),
  appNodeModules: resolve('../node_modules'),
  ownNodeModules: resolve('../node_modules')
};
