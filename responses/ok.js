/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, view);
 * return res.ok(data, redirectTo);
 * return res.ok(data, true);
 *
 * @param  {Object} data
 * @param  {Boolean|String} viewOrRedirect
 *         [optional]
 *          - pass string to render specified view
 *          - pass string with leading slash or http:// or https:// to do redirect
 */

module.exports = function ok (data, viewOrRedirect) {

  // Get access to `req` & `res`
  var req = this.req;
  var res = this;

  // Serve JSON (with optional JSONP support)
  function sendJSON (data) {
    if (!data) {
      return res.send();
    }
    else {
      if (typeof data !== 'object') { return res.send(data); }
      else return res.json(data);
    }
  }

  // Set status code
  res.status(200);

  // Serve JSON (with optional JSONP support)
  if (req.wantsJSON) {
    return sendJSON(data);
  }

  // Make data more readable for view locals
  var locals;
  if (!data || typeof data !== 'object'){
    locals = {};
  }
  else {
    locals = data;
  }

  // Serve HTML view or redirect to specified URL
  if (typeof viewOrRedirect === 'string') {
    if (viewOrRedirect.match(/^(\/|http:\/\/|https:\/\/)/)) {
      return res.redirect(viewOrRedirect);
    }
    else return res.view(viewOrRedirect, locals, function viewReady(viewErr, html) {
      if (viewErr) return sendJSON(data);
      else return res.send(html);
    });
  }
  else return sendJSON(data);
};



