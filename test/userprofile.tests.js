var auth0Profile = require('./fixtures/auth0-example-profile');
var auth0OIDCProfile = require('./fixtures/auth0-oidc-example-profile');
var Profile = require('../lib/Profile');

describe('Profile', function () {
  [auth0Profile, auth0OIDCProfile].forEach(function(profile) {
    before(function () {
      this.profile = new Profile(profile);
    });
  
    [
      ['provider', 'google-oauth2'],
      ['id', 'google-oauth2|ddddd123123123'],
      ['user_id', 'google-oauth2|ddddd123123123'],
      ['displayName', 'José F. Romaniello']
    ].forEach(function(tuple) {
      it('should map ' + tuple[0], function () {
        this.profile[tuple[0]]
          .should.eql(tuple[1]);
      });
    });
  
    it('should map the name', function () {
      this.profile.name.givenName
          .should.eql('José F.');
      this.profile.name.familyName
          .should.eql('Romaniello');
    });
  
    it('should map the emails', function () { 
      this.profile.emails[0]
        .value.should.eql('jfromaniello@gmail.com');
    });
  });
});