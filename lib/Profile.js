function Profile (data, raw) {

  if (data.identities) {
    this.provider = data.identities[0].provider;
  }
  
  this.displayName = data.name,
  this.id = data.user_id;

  this.name = {
    familyName: data.family_name,
    givenName: data.given_name
  };

  if (data.emails) {
    this.emails = data.emails.map(function (email) {
      return { value: email };
    });
  } else if (data.email) {
    this.emails = [{
      value: data.email
    }];
  }

  //copy these fields
  ['picture',
   'locale',
   'nickname',
   'gender',
   'identities'].filter(function (k) {
    return k in data;
  }).forEach(function (k) {
    this[k] = data[k];
  }.bind(this));

  this._json = data;
  this._raw = raw;
}

module.exports = Profile;