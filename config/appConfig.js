var config = {}

module.exports = (function () {
  
  config = require('./env/'+ (process.env.NODE_ENV ? process.env.NODE_ENV : 'local') );
  return config;

 })();