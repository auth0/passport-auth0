/**
 * Module dependencies.
 */
var util = require('util'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  axios = require('axios'),
  pkg = require('../package.json')
  crypto = require('crypto')
  querystring = require('querystring');

function encodeClientInfo(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

var clientInfoHeader = encodeClientInfo({
  name: 'passport-auth0',
  version: pkg.version,
  env: {
    node: process.version
  }
});

var Profile = require('./Profile');
var verifyWrapper = require('./verifyWrapper');

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
    expectedIssuer:   'https://' + options.domain + '/',
    authorizationURL: 'https://' + options.domain + '/authorize',
    tokenURL:         'https://' + options.domain + '/oauth/token',
    userInfoURL:      'https://' + options.domain + '/userinfo',
    apiUrl:           'https://' + options.domain + '/api'
  }

  this.options = Object.assign({}, defaultOptions, options);

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

  if (this.options.state) {
    if (!req.session) {
      throw new Error('Auth0Strategy requires you set state to false when no session is present')
    }

    if (req.query.code) {
      // If the code parameter is present, authenticate() is being called on the callback route.
      this._verify = verifyWrapper(this._verify, this.options, req.session.authParams);
    } else {
      // If the code parameter is not present, authenticate() is being called on the login route.
      req.session.authParams = {};
      req.session.authParams.scope = options.scope;
      req.session.authParams.nonce = crypto.randomBytes(16).toString('hex');
      this.authParams = req.session.authParams
    }
  } else if (options.scope && options.scope.includes('openid')) {
    throw new Error('Scope "openid" is not allowed without Auth0Strategy state true')
  }

  this._base.authenticate.call(this, req, options);
};

Strategy.prototype.authorizationParams = function(options) {
  var options = options || {};
  var params = Object.assign({}, options);

  /*
  You might wonder why we have delete statements here?
  The objective is to make it possible for consumers to use the API like this:

    passport.authenticate('auth0', {
      scope: 'openid email profile',
      'my_custom_extra_param': true // <== An extra param
    })

  To keep the validation of all expected options, we therefore take a copy
  and delete the "reserved" options. This leaves us with any extra params.
  When node.js version 6 is dropped at one point, this can be done in a single 
  line of code 😇

  const {connection, connection_scope, audience, prompt, login_hint, acr_value, nonce, max_age, ...theRest} = options;
  */
  delete params.connection;
  delete params.connection_scope;
  delete params.audience;
  delete params.prompt;
  delete params.login_hint;
  delete params.acr_values;
  delete params.nonce;
  delete params.max_age;

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

  var strategyOptions = this.options;
  if (strategyOptions && typeof strategyOptions.maxAge === 'number') {
    params.max_age = strategyOptions.maxAge;
  }

  if (this.authParams && typeof this.authParams.nonce === 'string') {
    params.nonce = this.authParams.nonce;
  }

  return params;
};

/**
 * @deprecated An Access Token is already included as part of the verify callback passed to Auth0Strategy.
 */
Strategy.prototype._getAccessToken = function(done){
  var body = {
    'client_id':     this.options.clientID,
    'client_secret': this.options.clientSecret,
    'type':          'web_server',
    'grant_type':    'client_credentials'
  };

  axios({
    method: 'POST',
    url: this.options.tokenURL,
    data: querystring.stringify(body),
    headers: { 
      'Auth0-Client': clientInfoHeader
    }
  })
    .then((response) => done(null, response.data['access_token'], response.data['id_token']))
    .catch((err) => done(err));
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
