var path = require('path');

var YAML = require('yamljs');


module.exports = function envConfig(env) {
  var filename;

  if (env === 'production') {
    filename = 'production.yaml';
  } else {
    filename = 'development.yaml';
  }

  var config = YAML.load(path.resolve(__dirname, '..', '..', filename));

  return config;
};
