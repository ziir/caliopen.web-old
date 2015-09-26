var http = require('http');

var ObjectAssign = Object.assign || require('object-assign');
var debug = require('debug')('caliopen.web:app:api-query');

function query(params) {
  var options = ObjectAssign({}, this.defaults || {}, params);

  debug('\n','Outgoing API query:', '\n', options);

  return http.request(options, function queryResponseCallback(response) {
    debug('\n','API query response:', '\n', response);
  }).on('response', options.response)
    .on('success', options.success)
    .on('error', options.error);
}

module.exports = {
  query: query
};
