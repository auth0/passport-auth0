# Change Log

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
