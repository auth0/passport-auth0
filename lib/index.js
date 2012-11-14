/**
 * Module dependencies.
 */
var util = require('util'), 
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  xtend = require('xtend');


/**
 * `Strategy` constructor.
 *
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  this.options = xtend({}, options, {   
    authorizationURL: 'https://login.auth0.com/authorize',
    tokenURL:         'https://login.auth0.com/oauth/token',
    userInfoURL:      'https://login.auth0.com/userinfo'
  });
  OAuth2Strategy.call(this, this.options, verify);
  this.name = 'auth10';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this.options.userInfoURL, accessToken, function (err, body, res) {
    if (err) { return done(err); }
    
    try {
      var json = JSON.parse(body);
      done(null, json);
    } catch(e) {
      done(e);
    }
  });
};

Strategy.prototype.authorizationParams = function(options) {
  if(!options.connection){
    throw new Error('invalid connection option');
  }
  return {connection: options.connection};
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
