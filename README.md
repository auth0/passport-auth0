![Auth0 authentication strategy for Passport.js](https://cdn.auth0.com/website/sdks/banners/passport-auth0-banner.png)

The [Auth0](https://auth0.com/) authentication strategy for [Passport.js](http://passportjs.org/), an authentication middleware for Node.js that can be unobtrusively dropped into any Express-based web application.

[![Release](https://img.shields.io/npm/v/passport-auth0)](https://npmjs.org/package/passport-auth0)
[![npm](https://img.shields.io/npm/dm/passport-auth0)](https://npmjs.org/package/passport-auth0)
[![License](https://img.shields.io/:license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
[![CircleCI](https://img.shields.io/circleci/build/github/auth0/passport-auth0)](https://circleci.com/gh/auth0/passport-auth0)

:books: [Documentation](#documentation) - :rocket: [Getting Started](#getting-started) - :speech_balloon: [Feedback](#feedback)

## Documentation

- [Docs site](https://www.auth0.com/docs) - explore our docs site and learn more about Auth0.


## Getting started
> :information_source:  **Maintenance Advisory:**  With the release of https://github.com/auth0/express-openid-connect, we will no longer be adding new features to this library, however we will continue to maintain this library and fix issues.  You can read more about the release of our new library at https://auth0.com/blog/auth0-s-express-openid-connect-sdk/

### Installation

The Auth0 Passport strategy is installed with npm. 

```
npm install passport-auth0
```

### Customization

#### State parameter

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

#### Scopes

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

#### Force a Specific IdP

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

#### Getting Access Tokens

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

#### Silent Authentication

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

## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/passport-auth0/issues).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.

---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png"   width="150">
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a></p>
<p align="center">
This project is licensed under the MIT license. See the <a href="./LICENSE"> LICENSE</a> file for more info.</p>

