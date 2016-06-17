var _ = require('lodash');
/**
 * 400 (Bad Request) Handler
 *
 */

module.exports = function badRequest(err, viewOrRedirect) {

  // Get access to `req` & `res`
  var req = this.req;
  var res = this;
  // Serve JSON (with optional JSONP support)
  function sendJSON (data) {

    if (!data) {
      return res.send();
    }
    else {

      if (typeof data !== 'object' || data instanceof Error) {
        data = {error: [
          {"message": data}
        ]};
      }
      return res.json(data);
    }
  }

  // Set status code
  res.status(400);

  // If the user-agent wants JSON, always respond with JSON
  if (req.wantsJSON) {
    return sendJSON(err);
  }

  // Make data more readable for view locals
  var locals;
  if (!err) { locals = {}; }
  else if (typeof err !== 'object'){
    locals = {error: err};
  }
  else {
    var readabilify = function (value) {
      if (_.isArray(value)) {
        return _.map(value, readabilify);
      }
      else if (_.isPlainObject(value)) {
        return value;
      }
      else return value;
    };
    locals = { error: readabilify(err) };
  }

  // Serve HTML view or redirect to specified URL
  if (typeof viewOrRedirect === 'string') {
    if (viewOrRedirect.match(/^(\/|http:\/\/|https:\/\/)/)) {
      return res.redirect(viewOrRedirect);
    }
    else return res.view(viewOrRedirect, locals, function viewReady(viewErr, html) {
      if (viewErr) return sendJSON(err);
      else return res.send(html);
    });
  }
  else return sendJSON(err);
};