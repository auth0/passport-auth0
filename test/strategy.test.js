var Auth10Strategy = require('../lib');
var assert = require('assert');
var should = require('should');

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

  it('state should be true by default', function() {
    this.strategy.options.state.should.be.true();
  });

  describe('authorizationParams', function () {

    it('should map the connection field', function () {
      var extraParams = this.strategy.authorizationParams({connection: 'foo'});
      extraParams.connection.should.eql('foo');
    });

    it('should not map the connection field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({connection: 42});
      should.not.exist(extraParams.connection);
    });

    it('should map the audience field', function () {
      var extraParams = this.strategy.authorizationParams({audience: 'foo'});
      extraParams.audience.should.eql('foo');
    });

    it('should not map the audience field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({audience: 42});
      should.not.exist(extraParams.audience);
    });

    it('should map the prompt field', function () {
      var extraParams = this.strategy.authorizationParams({prompt: 'foo'});
      extraParams.prompt.should.eql('foo');
    });

    it('should not map the prompt field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({prompt: 42});
      should.not.exist(extraParams.prompt);
    });

    it("shouldn't map any fields if non were specified", function () {
      var extraParams = this.strategy.authorizationParams({});
      Object.keys(extraParams).length.should.eql(0);
    });

    it("should treat no options as empty options", function () {
      var extraParams = this.strategy.authorizationParams(undefined);
      Object.keys(extraParams).length.should.eql(0);
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

describe('auth0 strategy with state parameter disabled', function () {
  var strategy = new Auth10Strategy({
    domain:       'jj.auth0.com',
    clientID:     'testid',
    clientSecret: 'testsecret',
    callbackURL:  '/callback',
    state: false
   },
   function(accessToken, idToken, profile, done) {}
  );

 it('state parameter should remain disabled', function() {
  strategy.options.state.should.be.false();
 });
});

describe('auth0 strategy with state parameter enabled explicitly', function () {
  var strategy = new Auth10Strategy({
    domain:       'jj.auth0.com',
    clientID:     'testid',
    clientSecret: 'testsecret',
    callbackURL:  '/callback',
    state: true
   },
   function(accessToken, idToken, profile, done) {}
  );

 it('state parameter should be enabled', function() {
  strategy.options.state.should.be.true();
 });
});