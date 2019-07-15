/**
 * Module dependencies.
 */
var util = require('util'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  request = require('request'),
  pkg = require('../package.json');

function encodeClientInfo(obj) {
  return new Buffer(JSON.stringify(obj)).toString('base64');
}

var clientInfoHeader = encodeClientInfo({
  name: 'passport-auth0',
  version: pkg.version,
  env: {
    node: process.version
  }
});

var Profile = require('./Profile');

/**
 * `Strategy` constructor.
 *
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  ['domain',
    'clientID',
    'clientSecret',
    'callbackURL'].forEach(function (k) {
    if(!options[k]){
      throw new Error('You must provide the ' + k + ' configuration value to use passport-auth0.');
    }
  });

  options.customHeaders = Object.assign(
    { 'Auth0-Client': clientInfoHeader },
    typeof options.customHeaders === 'object' ? options.customHeaders : {}
  );

  var defaultOptions = {
    authorizationURL: 'https://' + options.domain + '/authorize',
    tokenURL:         'https://' + options.domain + '/oauth/token',
    userInfoURL:      'https://' + options.domain + '/userinfo',
    apiUrl:           'https://' + options.domain + '/api'
  }

  this.options = Object.assign(options, defaultOptions);

  if (this.options.state === undefined) {
    this.options.state = true;
  }

  this._base = Object.getPrototypeOf(Strategy.prototype);
  this._base.constructor.call(this, this.options, verify);

  this.name = 'auth0';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.authenticate = function (req, options) {
  if (req.query && req.query.error) {
    return this.fail(req.query.error);
  }
  this._base.authenticate.call(this, req, options);
};

Strategy.prototype.authorizationParams = function(options) {
  var options = options || {};

  var params = {};
  if (options.connection && typeof options.connection === 'string') {
    params.connection = options.connection;

    if (options.connection_scope && typeof options.connection_scope === 'string') {
      params.connection_scope = options.connection_scope;
    }
  }
  if (options.audience && typeof options.audience === 'string') {
    params.audience = options.audience;
  }
  if (options.prompt && typeof options.prompt === 'string') {
    params.prompt = options.prompt;
  }
  if (options.login_hint && typeof options.login_hint === 'string') {
    params.login_hint = options.login_hint;
  }
  if (options.acr_values && typeof options.acr_values === 'string') {
    params.acr_values = options.acr_values;
  }

  return params;
};

/**
 * TODO: Deprecate
 */
Strategy.prototype._getAccessToken = function(done){
  var body = {
    'client_id':     this.options.clientID,
    'client_secret': this.options.clientSecret,
    'type':          'web_server',
    'grant_type':    'client_credentials'
  };

  request({
    method: 'POST',
    url: this.options.tokenURL,
    form: body,
    headers: {
      'Auth0-Client': clientInfoHeader
    }
  }, function (err, resp, body) {

    if(err) return done(err);
    var result = JSON.parse(body);
    var accessToken = result['access_token'];
    var idToken = result['id_token'];
    done(null, accessToken, idToken);
  });


};

/**
 * Retrieve user profile from Auth0.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         this is the strategy (google-oauth2, google, office365, google-apps)
 *   - `id`               this is the user_id of the auth0 profile
 *   - `username`         this is the nickname of the auth0 profile
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this.options.userInfoURL, accessToken, function (err, body, res) {
    if (err) { return done(new Error('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);
      var profile = new Profile(json, body);

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;
