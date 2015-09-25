var http = require('http');

var ObjectAssign = Object.assign || require('object-assign');

function query(params) {
  var options = ObjectAssign({}, this.defaults, params);

  console.log('Outgoing API query:', '\n', options);

  return http.request(options, function queryResponseCallback(response) {
    console.log('API query response:', '\n', response);
  }).on('response', options.response)
    .on('success', options.success)
    .on('error', options.error);
}

module.exports = {
  query: query
};
