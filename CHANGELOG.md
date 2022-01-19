# Change Log

## [v1.4.2](https://github.com/auth0/passport-auth0/tree/v1.4.2) (2022-01-19)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.4.2...v1.4.1)

**Fixed**
Upgrade axios from 0.21.4 to 0.22.0  [\#149](https://github.com/auth0/passport-auth0/pull/149) ([snyk-bot](https://github.com/snyk-bot))

## [v1.4.1](https://github.com/auth0/passport-auth0/tree/v1.4.1) (2021-10-13)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.4.1...v1.4.0)

**Changed**
Replace request with axios [\#144](https://github.com/auth0/passport-auth0/pull/144) ([frederikprijck](https://github.com/frederikprijck))

## [v1.4.0](https://github.com/auth0/passport-auth0/tree/v1.4.0) (2020-10-22)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.4.0...v1.3.3)

**Added**
Adding support for extra params to authorizeParams [\#131](https://github.com/auth0/passport-auth0/pull/131) ([alexbjorlig](https://github.com/alexbjorlig))

**Security**
Bump lodash from 4.17.15 to 4.17.20  [\#129](https://github.com/auth0/passport-auth0/pull/129)

**Fixed**
Fix to not override option values with defaults. [\#127](https://github.com/auth0/passport-auth0/pull/127) ([kierans](https://github.com/alexbjorlig))

## [v1.3.3](https://github.com/auth0/passport-auth0/tree/v1.3.3) (2020-06-05)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.3.3...v1.3.2)

**Closed issues**
- Having a session is now required[\#107](https://github.com/auth0/passport-auth0/issues/107)

**Fixed**
-  Allow sessionless authentication [\#120](https://github.com/auth0/passport-auth0/pull/120) ([davidpatrick](https://github.com/davidpatrick))

**Security**
-  Fixed dependency vulnerability in Mocha [\#121](https://github.com/auth0/passport-auth0/pull/121) ([davidpatrick](https://github.com/davidpatrick))

## [v1.3.2](https://github.com/auth0/passport-auth0/tree/v1.3.2) (2020-02-03)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.3.1...v1.3.2)

**Closed issues**
- 1.2.1 -> 1.3.1 upgrade causes "Cannot read property 'scope' of undefined" [\#107](https://github.com/auth0/passport-auth0/issues/107)
- TypeError: Cannot read property 'authParams' of undefined [\#106](https://github.com/auth0/passport-auth0/issues/106)
- Cannot read property 'split' of undefined in Profile.js with GSuite login [\#105](https://github.com/auth0/passport-auth0/issues/105)

**Fixed**
- Remove ID token `iat` value check [\#109](https://github.com/auth0/passport-auth0/pull/114) ([joshcanhelp](https://github.com/joshcanhelp))
- Fix missing ID causing cannot read error [\#109](https://github.com/auth0/passport-auth0/pull/109) ([joshcanhelp](https://github.com/joshcanhelp))
- Guard against undefined parameter access [\#108](https://github.com/auth0/passport-auth0/pull/108) ([pihvi](https://github.com/pihvi))

## [v1.3.1](https://github.com/auth0/passport-auth0/tree/v1.3.1) (2019-12-06)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.3.0...v1.3.1)

**Closed issues**
- the userProfile does not have 'provider' field correctly populated. [\#102](https://github.com/auth0/passport-auth0/issues/102)
- Social login breaks when account name contains utf-8 characters. [\#100](https://github.com/auth0/passport-auth0/issues/100)
- Strategy does not work on Restify [\#96](https://github.com/auth0/passport-auth0/issues/96)

**Fixed**
- Parses provider from user_id if identities is not provided. [\#103](https://github.com/auth0/passport-auth0/pull/103) ([kertof](https://github.com/kertof))
- Fix decoding jwt when encoded payload contains utf8 characters [\#101](https://github.com/auth0/passport-auth0/pull/101) ([abelptvts](https://github.com/abelptvts))

## [v1.3.0](https://github.com/auth0/passport-auth0/tree/v1.3.0) (2019-11-19)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.2.1...v1.3.0)

**Added**
- Improved OIDC compliance [\#97](https://github.com/auth0/passport-auth0/pull/97) ([davidpatrick](https://github.com/davidpatrick))

**Security**
- Update `lodash` package to address security vulnerabilities [\#94](https://github.com/auth0/passport-auth0/pull/94) ([https://github.com/is2ei](https://github.com/https://github.com/is2ei))
- Update `request` package to address security vulnerabilities with dependency `cryptiles` [\#98](https://github.com/auth0/passport-auth0/pull/98) ([davidpatrick](https://github.com/davidpatrick))

## [v1.2.1](https://github.com/auth0/passport-auth0/tree/v1.2.1) (2019-08-12)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.2.0...v1.2.1)

**Closed issues**
- Strategy constructor mutates options argument [\#91](https://github.com/auth0/passport-auth0/issues/91)
- Infinite redirect loop, "Invalid authorization request state." [\#89](https://github.com/auth0/passport-auth0/issues/89)
- could I use cookie-session instead of express-session? [\#87](https://github.com/auth0/passport-auth0/issues/87)

**Fixed**
- Fix strategy constructor to not mutate options argument [\#92](https://github.com/auth0/passport-auth0/pull/92) ([naptowncode](https://github.com/naptowncode))

## [v1.2.0](https://github.com/auth0/passport-auth0/tree/v1.2.0) (2019-07-31)
[Full Changelog](https://github.com/auth0/passport-auth0/compare/v1.1.0...v1.2.0)

**Closed issues**
- Not obvious how to style lock on redirect [\#74](https://github.com/auth0/passport-auth0/issues/74)
- Auth0 state parameter not always passed through [\#73](https://github.com/auth0/passport-auth0/issues/73)
- Allow for different grant types [\#72](https://github.com/auth0/passport-auth0/issues/72)
- Use native Object.assign instead of xtend [\#67](https://github.com/auth0/passport-auth0/issues/67)
- state parameter default to true [\#65](https://github.com/auth0/passport-auth0/issues/65)
- Custom Claims? [\#64](https://github.com/auth0/passport-auth0/issues/64)
- Auth0Strategy vs OAuth2Strategy [\#61](https://github.com/auth0/passport-auth0/issues/61)
- logout problems [\#59](https://github.com/auth0/passport-auth0/issues/59)
- What is the point of this line? [\#56](https://github.com/auth0/passport-auth0/issues/56)
- Custom User Store vs Auth0 Database [\#54](https://github.com/auth0/passport-auth0/issues/54)
- Setting a proxy [\#50](https://github.com/auth0/passport-auth0/issues/50)
- Document how to access the "state" parameter [\#40](https://github.com/auth0/passport-auth0/issues/40)
- Incompatible with Lock for Web's responseMode option [\#39](https://github.com/auth0/passport-auth0/issues/39)
- Return to same page after login? [\#38](https://github.com/auth0/passport-auth0/issues/38)
- refreshToken is always null [\#36](https://github.com/auth0/passport-auth0/issues/36)
- JWT Token [\#30](https://github.com/auth0/passport-auth0/issues/30)
- Specify JWT scope [\#29](https://github.com/auth0/passport-auth0/issues/29)
- Rule Errors do not propagate  [\#28](https://github.com/auth0/passport-auth0/issues/28)

**Added**
- Add telemetry [\#85](https://github.com/auth0/passport-auth0/pull/85) ([joshcanhelp](https://github.com/joshcanhelp))
- Add information on ID token scopes to README [\#83](https://github.com/auth0/passport-auth0/pull/83) ([joshcanhelp](https://github.com/joshcanhelp))
- Add support for acr_values [\#78](https://github.com/auth0/passport-auth0/pull/78) ([federicobarera](https://github.com/federicobarera))
- Add support for `connection_scope` option [\#75](https://github.com/auth0/passport-auth0/pull/75) ([GertSallaerts](https://github.com/GertSallaerts))

**Changed**
- Replace xtend with Object.assign [\#84](https://github.com/auth0/passport-auth0/pull/84) ([joshcanhelp](https://github.com/joshcanhelp))

**Security**
- Update mocha package to address security vulnerabilities [\#82](https://github.com/auth0/passport-auth0/pull/82) ([dan-auth0](https://github.com/dan-auth0))
- [Snyk] Fix for 5 vulnerable dependencies [\#77](https://github.com/auth0/passport-auth0/pull/77) ([snyk-bot](https://github.com/snyk-bot))
