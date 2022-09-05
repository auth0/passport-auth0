class Profile {
  constructor (data, raw) {
    this.displayName = data.name;
    this.id = data.user_id || data.sub;
    this.user_id = this.id;

    if (data.identities) {
      this.provider = data.identities[0].provider;
    } else if (typeof this.id === 'string' && this.id.indexOf('|') > -1) {
      this.provider = this.id.split('|')[0];
    }

    this.name = {
      familyName: data.family_name,
      givenName: data.given_name
    };

    if (data.emails) {
      this.emails = data.emails.map(email => ({
        value: email
      }));
    } else if (data.email) {
      this.emails = [{
        value: data.email
      }];
    }

    // Copy these fields
    ['picture', 'locale', 'nickname', 'gender', 'identities']
      .filter(k => k in data)
      .forEach(k => this[k] = data[k]);

    this._json = data;
    this._raw = raw;
  }
}

module.exports = Profile;