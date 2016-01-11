This is the auth0 authentication strategy for Passport.js.

## Installation

	npm install passport-auth0

## Configuration

Take your credentials from the [settings](https://app.auth0.com/#/settings) section in the dashboard and initialize the strategy as follows:

~~~js
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

var strategy = new Auth0Strategy({
   domain:       'your-domain.auth0.com',
   clientID:     'your-client-id',
   clientSecret: 'your-client-secret',
   callbackURL:  '/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);
~~~

## Usage

~~~js
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

app.get('/login',
  passport.authenticate('auth0', {}), function (req, res) {
  res.redirect("/");
});
~~~

This way when you go to ```/login``` you will get redirected to auth0, to a page where you can select the identity provider.

If you want to force an identity provider you can use:

~~~javascript
app.get('/login/google',
  passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
  res.redirect("/");
});
~~~

## API access

If you want to get a list of connections or users from auth0, use the [auth0 module](https://github.com/auth0/node-auth0).

## Complete example

A complete example of using this library [here](http://github.com/auth0/passport-auth0).

## Documentation

For more information about [auth0](http://auth0.com) contact our [documentation page](http://docs.auth0.com/).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
