# passport-auth0



This is the [Auth0](https://auth0.com/) authentication strategy for [Passport.js](http://passportjs.org/). Passport is authentication middleware for Node.js that can be unobtrusively dropped into any Express-based web application.

For Management API endpoints, please see the [Node Auth0 SDK](https://github.com/auth0/node-auth0).

[![Build Status](https://travis-ci.org/auth0/passport-auth0.svg?branch=master)](https://travis-ci.org/auth0/passport-auth0)
[![npm](https://img.shields.io/npm/v/passport-auth0)](https://npmjs.org/package/passport-auth0)
[![npm](https://img.shields.io/npm/dm/passport-auth0)](https://npmjs.org/package/passport-auth0)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Customization](#customization)
- [Support + Feedback](#support--feedback)
- [Vulnerability Reporting](#vulnerability-reporting)
- [What is Auth0](#what-is-auth0)
- [License](#license)

## Documentation

Full documentation with examples can be found in the [Node.js Quickstart](https://auth0.com/docs/quickstart/webapp/nodejs). 

You can also see fully working demos using this library in our [Auth0 blog](https://auth0.com/blog/):

* [Build and Authenticate a Node.js App with JSON Web Tokens](https://auth0.com/blog/building-and-authenticating-nodejs-apps/#nodejs-directory-structure)
* [Developing a Real-Time, Collaborative Editor with Pusher](https://auth0.com/blog/developing-a-real-time-collaborative-editor-with-pusher/)

## Installation

The Auth0 Passport strategy is installed with npm. 

    npm install passport-auth0

## Customization

### State parameter

The Auth0 Passport strategy enforces the use of the `state` parameter in OAuth 2.0 [authorization requests](https://tools.ietf.org/html/rfc6749#section-4.1.1) and requires session support in Express to be enabled.

If you require the `state` parameter to be omitted (which is not recommended), you can suppress it when calling the Auth0 Passport strategy constructor:

```js
const Auth0Strategy = require('passport-auth0');
const strategy = new Auth0Strategy({
     // ...
     state: false
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // ...
  }
);
```

[More on state handling here](https://github.com/auth0/passport-auth0/issues/40#issuecomment-511592801).

### Scopes

If you want to change the scope of the ID token provided, add a `scope` property to the authenticate configuration passed when defining the route. These must be [OIDC standard scopes](https://auth0.com/docs/scopes/current/oidc-scopes). If you need data outside of the standard scopes, you can add [custom claims](https://auth0.com/docs/scopes/current/custom-claims) to the token.

```js
app.get(
	'/login',
	passport.authenticate('auth0', {scope: 'openid email profile'}), 
	function (req, res) {
		res.redirect('/');
	}
);
```

### Force a Specific IdP

If you want to force a specific identity provider you can use:

```js
app.get(
	'/login/google',
	passport.authenticate('auth0', {connection: 'google-oauth2'}), 
	function (req, res) {
		res.redirect('/');
	}
);
```

If you force an identity provider you can also request custom scope from that identity provider:

```js
app.get(
	'/login/google', 
	passport.authenticate('auth0', {
		connection: 'google-oauth2',
		connection_scope: 'https://www.googleapis.com/auth/analytics, https://www.googleapis.com/auth/contacts.readonly'
	}), 
	function (req, res) {
		res.redirect('/');
	}
);
```

### Getting Access Tokens

If you want to specify an audience for the returned `access_token` you can:

```js
app.get(
	'/login',
	passport.authenticate('auth0', {audience: 'urn:my-api'}), 
	function (req, res) {
	  res.redirect('/');
	}
);
```

### Silent Authentication

If you want to check authentication without showing a prompt:

```js
app.get(
	'/login',
	passport.authenticate('auth0', {prompt: 'none'}), 
	function (req, res) {
		res.redirect('/');
	}
);
```

## Support + Feedback

- Use [Issues](https://github.com/auth0/passport-auth0/issues) for code-level support
- Use our [Community](https://community.auth0.com/) for usage, questions, specific cases

## Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## What is Auth0?

Auth0 helps you to easily:

- implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)
- log in users with username/password databases, passwordless, or multi-factor authentication
- link multiple user accounts together
- generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely
- access demographics and analytics detailing how, when, and where users are logging in
- enrich user profiles from other data sources using customizable JavaScript rules

[Why Auth0?](https://auth0.com/why-auth0)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
