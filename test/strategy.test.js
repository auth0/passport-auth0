var Auth10Strategy = require('../lib');
var assert = require('assert');

describe('auth0 strategy', function () {
  before(function () {
    this.strategy = new Auth10Strategy({
       domain:       'jj.auth0.com', 
       clientID:     'testid',
       clientSecret: 'testsecret',
       callbackURL:  '/callback'
      },
      function(accessToken, idToken, profile, done) {}
    );
  });

  it('authorizationURL should have the domain', function () {
    this.strategy.options
      .authorizationURL.should.eql('https://jj.auth0.com/authorize');
  });
  
  it('tokenURL should have the domain', function () {
    this.strategy.options
      .tokenURL.should.eql('https://jj.auth0.com/oauth/token');
  });
  
  it('userInfoURL should have the domain', function () {
    this.strategy.options
      .userInfoURL.should.eql('https://jj.auth0.com/userinfo');
  });

  describe('authorizationParams', function () {

    it('should map the connection field', function () {
      var extraParams = this.strategy.authorizationParams({connection: 'foo'});
      extraParams.connection.should.eql('foo');
    });

  });

  describe('authenticate', function () { 
    it('when there is an error querystring propagate', function (done) {
      
      this.strategy.fail = function (challenge, status) {
        challenge.should.eql('domain_mismatch');
        done();
      };

      this.strategy.authenticate({
        query: {
          error: 'domain_mismatch'
        }
      });
    });
  }); 
});