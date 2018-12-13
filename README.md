# passport-auth0

[![Build Status](https://travis-ci.org/auth0/passport-auth0.svg?branch=master)](https://travis-ci.org/auth0/passport-auth0)

This is the [Auth0](https://auth0.com/) authentication strategy for Passport.js.

## Passport.js

[Passport](http://passportjs.org/) is authentication middleware for Node.js. Passport can be unobtrusively dropped into any Express-based web application.

## Installation

    npm install passport-auth0

## Configuration

Take your credentials from the _Settings_ tab of your [Auth0 application](https://manage.auth0.com/#/applications/) in the dashboard and initialize the strategy as follows:

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

### State parameter

The Auth0 Passport strategy enforces the use of the `state` parameter in OAuth 2.0 [authorization requests](https://tools.ietf.org/html/rfc6749#section-4.1.1) and requires session support in Express to be enabled.

If you require the `state` parameter to be omitted (which is not recommended), you can suppress it when calling the Auth0 Passport strategy constructor:

~~~js
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
     domain: 'your-domain.auth0.com',
     // ...
     state: false
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // ...
  }
);
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

This way when you go to `/login`, you will get redirected to an Auth0 page where you can select the identity provider.

If you want to change the scope of the ID token provided, add a `scope` property to the authenticate configuration passed when defining the route. These must be [OIDC standard scopes](https://auth0.com/docs/scopes/current/oidc-scopes). If you need data outside of the standard scopes, you can add [custom claims](https://auth0.com/docs/scopes/current/custom-claims) to the token.

~~~javascript
app.get('/login',
  passport.authenticate('auth0', {scope: 'openid email profile'}), function (req, res) {
  res.redirect("/");
});
~~~

If you want to force an identity provider you can use:

~~~javascript
app.get('/login/google',
  passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
  res.redirect("/");
});
~~~

If you force an identity provider you can also request custom scope from that identity provider:

~~~javascript
app.get('/login/google', passport.authenticate('auth0', {
  connection: 'google-oauth2',
  connection_scope: 'https://www.googleapis.com/auth/analytics, https://www.googleapis.com/auth/contacts.readonly'
}), function (req, res) {
  res.redirect("/");
});
~~~

If you want to specify an audience for the returned `access_token` you can:

~~~javascript
app.get('/login',
  passport.authenticate('auth0', {audience: 'urn:my-api'}), function (req, res) {
  res.redirect("/");
});
~~~

If you want to control the OIDC prompt you can use:

~~~javascript
app.get('/login',
  passport.authenticate('auth0', {prompt: 'none'}), function (req, res) {
  res.redirect("/");
});
~~~

## API access

If you want to get a list of connections or users from Auth0, [use the Node.js SDK](https://github.com/auth0/node-auth0).

## Examples

You can also see fully working demos using this library in our [Auth0 blog](https://auth0.com/blog/):

* [Build and Authenticate a Node.js App with JSON Web Tokens](https://auth0.com/blog/building-and-authenticating-nodejs-apps/#nodejs-directory-structure)

* [Developing a Real-Time, Collaborative Editor with Pusher](https://auth0.com/blog/developing-a-real-time-collaborative-editor-with-pusher/)

## What is Auth0?

Auth0 helps you to easily:

- implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)
- log in users with username/password databases, passwordless, or multi-factor authentication
- link multiple user accounts together
- generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely
- access demographics and analytics detailing how, when, and where users are logging in
- enrich user profiles from other data sources using customizable JavaScript rules

[Why Auth0?](https://auth0.com/why-auth0)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com/)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
