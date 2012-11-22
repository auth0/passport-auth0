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
    authorizationURL: 'https://' + options.namespace + '/authorize',
    tokenURL:         'https://' + options.namespace + '/oauth/token',
    userInfoURL:      'https://' + options.namespace + '/userinfo',
    apiUrl:           'https://' + options.namespace + '/api'
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


Strategy.prototype.getConnectionList = function(done) {
  var self = this;
  this._oauth2.getOAuthAccessToken(null, {grant_type: 'client_credentials' }, function (err, accessToken, refreshToken) {
    if (err) { return done(err); }
    self._oauth2.get(self.options.apiUrl + '/connections', accessToken, function (err, body) {
      if (err) { return done(err); }
      
      try {
        var json = JSON.parse(body);
        done(null, json);
      } catch(e) {
        done(e);
      }
    });
  });
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
