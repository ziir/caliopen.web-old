module.exports = function envConfig(env) {
  if (env === 'production') {
    return require('./production.json');
  } else {
    return require('./development.json');
  }
};
