var Auth10Strategy = require('../lib');
var assert = require('assert');

describe('auth0 strategy', function () {
  before(function () {
    this.strategy = new Auth10Strategy({
       clientID:     'testid',
       clientSecret: 'testsecret',
       callbackURL:  '/callback'
      },
      function(accessToken, refreshToken, profile, done) {}
    );
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