/**
 * Module dependencies.
 */
var util = require('util'),
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  xtend = require('xtend'),
  request = require('request');

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
      throw new Error(k + ' is required');
    }
  });


  this.options = xtend({}, options, {
    authorizationURL: 'https://' + options.domain + '/authorize',
    tokenURL:         'https://' + options.domain + '/oauth/token',
    userInfoURL:      'https://' + options.domain + '/userinfo',
    apiUrl:           'https://' + options.domain + '/api'
  });


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
  return {connection: options.connection};
};


Strategy.prototype._getAccessToken = function(done){
  var body = {
    'client_id':     this.options.clientID,
    'client_secret': this.options.clientSecret,
    'type':          'web_server',
    'grant_type':    'client_credentials'
  };

  request.post({
    url: this.options.tokenURL,
    form: body
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
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

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
 * Expose `Strategy`.
 */
module.exports = Strategy;
