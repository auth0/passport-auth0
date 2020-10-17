var Auth0Strategy = require('../lib');
var assert = require('assert');
var should = require('should');
var pkg = require('../package.json');

describe('auth0 strategy', function () {
  beforeEach(function () {
    this.strategy = new Auth0Strategy({
       domain:       'test.auth0.com',
       clientID:     'testid',
       clientSecret: 'testsecret',
       callbackURL:  '/callback'
      },
      function(accessToken, idToken, profile, done) {}
    );
  });

  describe('options', function() {
    describe('defaults', function() {
      it('expectedIssuer should have the domain', function () {
        this.strategy.options
        .expectedIssuer.should.eql('https://test.auth0.com/');
      });

      it('authorizationURL should have the domain', function () {
        this.strategy.options
          .authorizationURL.should.eql('https://test.auth0.com/authorize');
      });

      it('tokenURL should have the domain', function () {
        this.strategy.options
          .tokenURL.should.eql('https://test.auth0.com/oauth/token');
      });

      it('userInfoURL should have the domain', function () {
        this.strategy.options
          .userInfoURL.should.eql('https://test.auth0.com/userinfo');
      });

      it('apiURL should have the domain', function () {
        this.strategy.options
          .apiUrl.should.eql('https://test.auth0.com/api');
      });
    });

    it('should not override options with defaults', function() {
      const strategy = new Auth0Strategy({
          domain:       'test.auth0.com',
          clientID:     'testid',
          clientSecret: 'testsecret',
          callbackURL:  '/callback',

          expectedIssuer:   'https://foobar.com/',
          authorizationURL: 'https://foobar.com/authorize',
          tokenURL:         'https://foobar.com/oauth/token',
          userInfoURL:      'https://foobar.com/userinfo',
          apiUrl:           'https://foobar.com/api'
        },
        function(accessToken, idToken, profile, done) {}
      );

      strategy.options
        .expectedIssuer.should.eql('https://foobar.com/');

      strategy.options
        .authorizationURL.should.eql('https://foobar.com/authorize');

      strategy.options
        .tokenURL.should.eql('https://foobar.com/oauth/token');

      strategy.options
        .userInfoURL.should.eql('https://foobar.com/userinfo');

      strategy.options
        .apiUrl.should.eql('https://foobar.com/api');
    });
  });

  it('should include a telemetry header by default', function() {
    var headers = this.strategy.options.customHeaders;
    should.exist(headers['Auth0-Client']);
  });

  it('should include a correct telemetry values', function() {
    var telemetryValue = new Buffer( this.strategy.options.customHeaders['Auth0-Client'], 'base64' ).toString('ascii');
    var telemetryJson = JSON.parse(telemetryValue)

    telemetryJson.name.should.eql('passport-auth0');
    telemetryJson.version.should.eql(pkg.version);
    should.exist(telemetryJson.env);
    should.exist(telemetryJson.env.node);
  });

  it('state should be true by default', function() {
    this.strategy.options.state.should.be.true();
  });

  it('should copy options object without mutating', function () {
    var options = {
      domain:       'test.auth0.com',
      clientID:     'testid',
      clientSecret: 'testsecret',
      callbackURL:  '/callback'
    };
    var strategy = new Auth0Strategy(
      options,
      function(accessToken, idToken, profile, done) {}
    );

    strategy.options.should.be.not.equal(options);
    options.should.not.have.property('authorizationURL');
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

    it('should map the connection_scope field', function () {
      var extraParams = this.strategy.authorizationParams({
        connection: 'foo',
        connection_scope: 'foo'
      });
      extraParams.connection_scope.should.eql('foo');
    });

    it('should not map the connection_scope field if connection is not set', function () {
      var extraParams = this.strategy.authorizationParams({
        connection_scope: 'foo'
      });
      should.not.exist(extraParams.connection_scope);
    });

    it('should not map the connection_scope field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({
        connection: 'foo',
        connection_scope: 42
      });
      should.not.exist(extraParams.connection_scope);
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

    it('should map the login_hint field', function () {
      var extraParams = this.strategy.authorizationParams({login_hint: 'test.user@auth0.com'});
      extraParams.login_hint.should.eql('test.user@auth0.com');
    });

    it('should not map the login_hint field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({login_hint: 42});
      should.not.exist(extraParams.login_hint);
    });

    it('should map the acr_values field', function () {
      var extraParams = this.strategy.authorizationParams({acr_values: 'dummy:1'});
      extraParams.acr_values.should.eql('dummy:1');
    });

    it('should not map the acr_values field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({acr_values: 1});
      should.not.exist(extraParams.acr_values);
    });

    it('should not map the acr_values field when not specified in options', function () {
      var extraParams = this.strategy.authorizationParams({});
      should.not.exist(extraParams.acr_values);
    });

    it('should map the nonce field when authParams set on strategy', function () {
      this.strategy.authParams = { nonce: 'foo'};
      var extraParams = this.strategy.authorizationParams({});
      extraParams.nonce.should.eql('foo');
    });

    it('should not map the nonce field if its not a string', function () {
      var extraParams = this.strategy.authorizationParams({nonce: 1});
      should.not.exist(extraParams.nonce);
    });

    it('should not map the nonce field when not specified in options', function () {
      var extraParams = this.strategy.authorizationParams({});
      should.not.exist(extraParams.nonce);
    });

    it('should map the max_age field when set in strategy options', function () {
      var maxAge = Math.floor(Date.now()/1000);
      this.strategy.options = { maxAge: maxAge };
      var extraParams = this.strategy.authorizationParams({max_age: maxAge});
      extraParams.max_age.should.eql(maxAge);
    });

    it('should not map the max_age field if its not a number', function () {
      var extraParams = this.strategy.authorizationParams({max_age: '60'});
      should.not.exist(extraParams.max_age);
    });

    it('should not map the max_age field when not specified in options', function () {
      var extraParams = this.strategy.authorizationParams({});
      should.not.exist(extraParams.max_age);
    });

    it('should add extra params, if provided', function () {
      var extraParams = this.strategy.authorizationParams({my_custom_param: true});
      should.exist(extraParams.my_custom_param);
    });

    it('should multiple extra params, if provided', function () {
      var extraParams = this.strategy.authorizationParams({my_custom_param1: true, my_custom_param2: 123});
      should.exist(extraParams.my_custom_param1);
      should.exist(extraParams.my_custom_param2);
    });

    it('Should be pure', function() {
      var params = {connection: '123'};
      this.strategy.authorizationParams(params);
      should.exist(params.connection);
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

describe('auth0 strategy with a custom header', function () {
  var strategy = new Auth0Strategy(
    {
      domain:       'test.auth0.com',
      clientID:     'testid',
      clientSecret: 'testsecret',
      callbackURL:  '/callback',
      customHeaders: {
        testCustomHeader: 'Test Custom Header'
      }
    },
    function(accessToken, idToken, profile, done) {}
  );

  it('should not override a custom header', function() {
    should.exist(strategy.options.customHeaders);
    should.exist(strategy.options.customHeaders.testCustomHeader);
    strategy.options.customHeaders.testCustomHeader.should.eql('Test Custom Header');
  });

  it('should keep the telemetry header', function() {
    should.exist(strategy.options.customHeaders['Auth0-Client']);
  });
});

describe('auth0 strategy with state parameter disabled', function () {
  var strategy = new Auth0Strategy({
    domain:       'test.auth0.com',
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
  var strategy = new Auth0Strategy({
    domain:       'test.auth0.com',
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
