var auth0Profile = require('./fixtures/auth0-example-profile');
var auth0ProfileNoIdentites = require('./fixtures/auth0-example-profile-no-identities');
var auth0OIDCProfile = require('./fixtures/auth0-oidc-example-profile');
var Profile = require('../lib/Profile');

describe('Standard profiles', function () {
  [auth0Profile, auth0ProfileNoIdentites, auth0OIDCProfile].forEach(function(profile) {
    before(function () {
      this.profile = new Profile(profile);
    });

    [
      ['provider', '__test_provider__'],
      ['id', '__test_provider__|__test_user_id__'],
      ['user_id', '__test_provider__|__test_user_id__'],
      ['displayName', '__test_name__']
    ].forEach(function(tuple) {
      it('should map ' + tuple[0], function () {
        this.profile[tuple[0]]
          .should.eql(tuple[1]);
      });
    });

    it('should map the name', function () {
      this.profile.name.givenName
          .should.eql('__test_given_name__');
      this.profile.name.familyName
          .should.eql('__test_family_name__');
    });

    it('should map the emails', function () {
      this.profile.emails[0]
        .value.should.eql('__test_email__');
    });
  });
});

describe('Non-standard profiles', function () {

  describe('Profile without an ID', function () {
    const profile = new Profile({email: '__test_email__'});

    it('should have no provider', function () {
      profile.should.not.have.property('provider');
    });
  });

  describe('Profile without a provider in the user ID', function () {
    const profile = new Profile({sub: '__test_sub__'});

    it('should have no provider', function () {
      profile.should.not.have.property('provider');
    });

    it('should have the correct ID', function () {
      profile.id.should.eql('__test_sub__');
    });
  });

  describe('Profile without an email', function () {
    const profile = new Profile({sub: '__test_sub__'});

    it('should have no emails', function () {
      profile.should.not.have.property('emails');
    });
  });
});

