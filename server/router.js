const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})
//session false means dont use cookies, which are on by default.  using tokens here.

module.exports = function(app) {
    app.get('/', requireAuth, function(req,res) {
        res.send({"gimme that": "butt"})
    })
    app.post('/signup', Authentication.signup) 
    app.post('/signin', requireSignin, Authentication.signin) 
}