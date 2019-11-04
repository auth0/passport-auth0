var jwt = require ('./jwt');

/**
 * Adds idToken Validation to Passport verification
 *
 * This function wraps the passport verification with id token validation
 *
 * @param {Function} verify
 * @param {Object} strategyOptions
 * @param {Object} authParams
 * @api protected
 */
function verifyWrapper (verify, strategyOptions, authParams) {
    // passport-oauth2 handles the verifier based on lengths of arguments
    // and changes the order if passReqToCallback is passed to the strategy
    // options.  This wrapper will make the length of arguments consistent
    // and add support for passReqToCallback

  if (strategyOptions.passReqToCallback) {
    return function (req, accessToken, refreshToken, params, profile, done) {
      handleIdTokenValidation(strategyOptions, authParams, params);
      verify.apply(null, arguments);
    }
  } else {
    return function (accessToken, refreshToken, params, profile, done) {
      handleIdTokenValidation(strategyOptions, authParams, params);
      verify.apply(null, arguments);
    }
  }
}

function handleIdTokenValidation (strategyOptions, authParams, params) {
  if (authParams.scope && authParams.scope.includes('openid')) {
    jwt.verify(params.id_token, {
      aud: strategyOptions.clientID,
      iss: 'https://' + strategyOptions.domain + '/',
      leeway: strategyOptions.leeway,
      maxAge: strategyOptions.maxAge,
      nonce: authParams.nonce
    });
  }
}

module.exports = verifyWrapper;
