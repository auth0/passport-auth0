This is the auth0 authentication strategy for Passport.js.

## Instalation

	npm install http://bit.ly/passportauth0

## Configuration

~~~js
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

var strategy = new Auth0Strategy({
   namespace:    'your-namespace.auth0.com',
   clientID:     'your-client-id',
   clientSecret: 'your-client-secret',
   callbackURL:  '/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    //do something here with the profile
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
  passport.authenticate('auth0', {connection: 'connection1'}), function (req, res) {
  res.redirect("/");
});
~~~


## API access 


You can use auth0 API to manage your connections in the same way you do in the [dashboard](http://app.auth0.com).

Get a list of connections as follows:

~~~js
strategy.getConnections(function (err, connections){
  //.....
});
~~~

Create a google connection as follows:

~~~js
var myNewConnection =  {
    "name": "a-new-connection",
    "strategy": "google-oauth2",
    "client_id": "aaa",
    "options": {
      "client_secret": "aadsadsadsa",
      "email": true,
      "profile": true,
      "contacts": false,
      "blogger": false,
      "calendar": false,
      "gmail": false,
      "google_plus": false,
      "orkut": false,
      "picasa_web": false,
      "tasks": false,
      "youtube": false,
      "adsense_management": false,
      "google_affiliate_network": false,
      "analytics": false,
      "google_books": false,
      "google_cloud_storage": false,
      "content_api_for_shopping": false,
      "chrome_web_store": false,
      "document_list": false,
      "google_drive": false,
      "google_drive_files": false,
      "latitude_best": false,
      "latitude_city": false,
      "moderator": false,
      "sites": false,
      "spreadsheets": false,
      "url_shortener": false,
      "webmaster_tools": false
    },
    "status": 0
  };

strategy.createConnection(myNewConnection, function (err) {
  //.....
});
~~~

## Complete example

A complete example of using this library [here](http://github.com/qraftlabs/passport-auth0).