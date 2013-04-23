module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: '悦惠尚品'
      },
      db: 'mongodb://localhost/lovey',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/facebook/callback"
      }
    }
  , test: {

    }
  , production: {

    }
}