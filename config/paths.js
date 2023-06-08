const { resolve } = require('path');
const pkg = require('../package.json');

module.exports = {
  // Source files
  src: resolve(__dirname, '../src'),

  // Production build files
  build: resolve(__dirname, '../' + pkg.name),

  // Static files that get copied to build folder
  public: resolve(__dirname, '../public'),
};
