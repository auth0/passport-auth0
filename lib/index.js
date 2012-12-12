/**
 * Module dependencies.
 */
var util = require('util'), 
  OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
  xtend = require('xtend'),
  request = require('request');


/**
 * `Strategy` constructor.
 *
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if(options.namespace){
    this.options = xtend({}, options, {   
      authorizationURL: 'https://' + options.namespace + '/authorize',
      tokenURL:         'https://' + options.namespace + '/oauth/token',
      userInfoURL:      'https://' + options.namespace + '/userinfo',
      apiUrl:           'https://' + options.namespace + '/api'
    });
  }else {
    this.options = options;
  }
  
  OAuth2Strategy.call(this, this.options, verify);
  this.name = 'auth0';
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
    var accessToken = JSON.parse(body)['access_token'];
    done(null, accessToken);
  });
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
