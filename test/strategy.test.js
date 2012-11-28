var Auth10Strategy = require('../lib');
var assert = require('assert');

describe('auth0 strategy', function () {
  before(function () {
    this.strategy = new Auth10Strategy({
       namespace:    'jj.auth0.com', 
       clientID:     'testid',
       clientSecret: 'testsecret',
       callbackURL:  '/callback'
      },
      function(accessToken, refreshToken, profile, done) {}
    );
  });

  it('can initialize with urls', function () {
    var strategy = new Auth10Strategy({
      authorizationURL: 'https://localhost:3000/authorize',
      tokenURL:         'https://localhost:3000/oauth/token',
      userInfoURL:      'https://localhost:3000/userinfo',
      apiUrl:           'https://localhost:3000/api',
      clientID:     'testid',
      clientSecret: 'testsecret',
      callbackURL:  '/callback'
      }, function() {}
    );

    strategy.options.authorizationURL
      .should.eql('https://localhost:3000/authorize');
  });


  it('authorizationURL should have the namespace', function () {
    this.strategy.options
      .authorizationURL.should.eql('https://jj.auth0.com/authorize');
  });
  
  it('tokenURL should have the namespace', function () {
    this.strategy.options
      .tokenURL.should.eql('https://jj.auth0.com/oauth/token');
  });
  
  it('userInfoURL should have the namespace', function () {
    this.strategy.options
      .userInfoURL.should.eql('https://jj.auth0.com/userinfo');
  });

  describe('authorizationParams', function () {

    it('should map the connection field', function () {
      var extraParams = this.strategy.authorizationParams({connection: 'foo'});
      extraParams.connection.should.eql('foo');
    });

    it('should fail if the connection is missing', function () {

      (function () {
        this.strategy.authorizationParams({});
      }.bind(this)).should.throw('invalid connection option');
    
    });

  });
});