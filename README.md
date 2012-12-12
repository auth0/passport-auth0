This is the auth0 authentication strategy for Passport.js.

## Instalation

	npm install passport-auth0

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

If you want to get a list of connections or users from auth0, use the [auth0 module](https://github.com/qraftlabs/node-auth0).

## Complete example

A complete example of using this library [here](http://github.com/qraftlabs/passport-auth0).