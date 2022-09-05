/**
 * Module dependencies.
 */
const { OAuth2Strategy } = require('passport-oauth'),
  crypto = require('crypto'),
  pkg = require('../package.json'),
  Profile = require('./Profile.js'),
  verifyWrapper = require('./verifyWrapper.js');

function encodeClientInfo(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

const clientInfoHeader = encodeClientInfo({
  name: 'passport-auth0',
  version: pkg.version,
  env: {
    node: process.version
  }
});

class Strategy extends OAuth2Strategy {
  /**
   * `Strategy` constructor.
   *
   * @param {Object} options
   * @param {OAuth2Strategy.VerifyFunction} verify
   * @api public
   */
  constructor (options, verify) {
    ['domain',
      'clientID',
      'clientSecret',
      'callbackURL'].forEach(k => {
        if (!options[k]) {
          throw new Error(`You must provide the ${k} configuration value to use passport-auth0.`);
        }
      });

    options.customHeaders = Object.assign(
      { 'Auth0-Client': clientInfoHeader },
      typeof options.customHeaders === 'object' ? options.customHeaders : {}
    );

    const { domain } = options;

    const defaultOptions = {
      expectedIssuer: `https://${domain}/`,
      authorizationURL: `https://${domain}/authorize`,
      tokenURL: `https://${domain}/oauth/token`,
      userInfoURL: `https://${domain}/userinfo`,
      apiUrl: `https://${domain}/api`
    };

    const config = Object.assign({}, defaultOptions, options);

    if (config.state === undefined) {
      config.state = true;
    }

    super(config, verify);

    this.options = config;
    this.name = 'auth0';
  }

  authenticate (req, options) {
    if (req.query && req.query.error) {
      return this.fail(req.query.error);
    }

    if (this.options.state) {
      if (!req.session) {
        throw new Error('Auth0Strategy requires you set state to false when no session is present');
      }

      if (req.query.code) {
        // If the code parameter is present, authenticate() is being called on the callback route.
        this._verify = verifyWrapper(this._verify, this.options, req.session.authParams);
      } else {
        // If the code parameter is not present, authenticate() is being called on the login route.
        req.session.authParams = {};
        req.session.authParams.scope = options.scope;
        req.session.authParams.nonce = crypto.randomBytes(16).toString('hex');
        this.authParams = req.session.authParams;
      }
    } else if (options.scope && options.scope.includes('openid')) {
      throw new Error('Scope "openid" is not allowed without Auth0Strategy state true');
    }

    super.authenticate(req, options);
  }

  authorizationParams (options) {
    var options = options || {};
    var params = Object.assign({}, options);

    /*
    You might wonder why we have delete statements here?
    The objective is to make it possible for consumers to use the API like this:

      passport.authenticate('auth0', {
        scope: 'openid email profile',
        'my_custom_extra_param': true // <== An extra param
      })

    To keep the validation of all expected options, we therefore take a copy
    and delete the "reserved" options. This leaves us with any extra params.
    */
    const {
      connection,
      connection_scope,
      audience,
      prompt,
      login_hint,
      acr_values,
      maxAge
    } = options;

    delete params.connection;
    delete params.connection_scope;
    delete params.audience;
    delete params.prompt;
    delete params.login_hint;
    delete params.acr_values;
    delete params.nonce;
    delete params.max_age;

    if (connection && typeof connection === 'string') {
      params.connection = connection;

      if (connection_scope && typeof connection_scope === 'string') {
        params.connection_scope = connection_scope;
      }
    }
    if (audience && typeof audience === 'string') {
      params.audience = audience;
    }
    if (prompt && typeof prompt === 'string') {
      params.prompt = prompt;
    }
    if (login_hint && typeof login_hint === 'string') {
      params.login_hint = login_hint;
    }
    if (acr_values && typeof acr_values === 'string') {
      params.acr_values = acr_values;
    }
    if (maxAge && typeof maxAge === 'number') {
      params.max_age = maxAge;
    }
    if (this.authParams && typeof this.authParams.nonce === 'string') {
      params.nonce = this.authParams.nonce;
    }

    return params;
  }

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
  userProfile (accessToken, done) {
    this._oauth2.get(this.options.userInfoURL, accessToken, function (err, body, res) {
      if (err) { return done(new Error('failed to fetch user profile', err)); }

      try {
        var json = JSON.parse(body);
        var profile = new Profile(json, body);

        done(null, profile);
      } catch (e) {
        done(e);
      }
    });
  }
}

/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;
