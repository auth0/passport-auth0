var jwt = require ('./jwt');

/**
 * Adds ID token validation to Passport verification process.
 *
 * Parent passport-oauth2 library handles the verifier based on the number
 * of arguments and changes the order if passReqToCallback is passed
 * in with the strategy options. This wrapper will make the length of
 * arguments consistent and add support for passReqToCallback.
 *
 * @param {Function} verify
 * @param {Object} strategyOptions
 * @param {Object} authParams
 */
function verifyWrapper (verify, strategyOptions, authParams) {

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

/**
 * Perform ID token validation if an ID token was requested during login.
 *
 * @param {Object} strategyOptions
 * @param {Object} authParams
 * @param {Object} params
 */
function handleIdTokenValidation (strategyOptions, authParams, params) {
  if (authParams && authParams.scope && authParams.scope.includes('openid')) {
    jwt.verify(params.id_token, {
      aud: strategyOptions.clientID,
      iss: strategyOptions.expectedIssuer,
      leeway: strategyOptions.leeway,
      maxAge: strategyOptions.maxAge,
      nonce: authParams.nonce
    });
  }
}

module.exports = verifyWrapper;
