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
    userInfoURL:      'https://' + options.namespace + '/userinfo'
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


/*
 * Override request.logout to execute /logout in auth10
 */
(function overrideLogout(){

  var request = require('request');
  var http = require('http'), 
    req = http.IncomingMessage.prototype;

  var stdLogout = req.logout;

  req.logout =
  req.logOut = function (res, url) {
    if(res && url){
      var strategies = this._passport.instance._strategies;
      Object.keys(strategies)
        .map(function(key){ return strategies[key]; })
        .forEach(function(strategy){
          if(strategy instanceof Strategy){
            var ns = strategy.options.namespace;
            res.redirect('https://' + ns + '/logout?reply=' + encodeURIComponent(url));
          }
        });
    }
    stdLogout.call(this);
  };
  
})();


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
