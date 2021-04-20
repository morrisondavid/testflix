const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withCSS({
  // Set this to true if you use CSS modules.
  // See: https://github.com/css-modules/css-modules
  cssModules: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
