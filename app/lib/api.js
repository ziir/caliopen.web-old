var http = require('http');

var ObjectAssign = Object.assign || require('object-assign');

function query(params) {
  var options = ObjectAssign({}, params, this.defaults);

  console.log('Outgoing API query', '\n', options);

  return http.request(options, options.response)
    .on('response', options.response)
    .on('success', options.success)
    .on('error', options.error);
}

module.exports = {
  query: query
};
