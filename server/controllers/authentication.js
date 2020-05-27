const User = require('../models/user');

const keys = require('../config/keys')

const jwt = require('jwt-simple')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtSecretString)
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email, !password) {
      return res.status(422).send({error: 'You must provide both email and password'})
  }

  // see if a user with the given email exists

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    //if a user with email does exist, return error

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    //if a user qith email does NOT exist, create and save user record

    const user = new User({
        email: email, 
        password: password
    })

    user.save(function(err) {
        if (err) {
            return next(err)
        }

            //respond to request indicating user was created
        res.send({
            token: tokenForUser(user)
        })
    })

  });
};

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd,
  // they just need to get a token
  res.send({
    token: tokenForUser(req.user)
  })
}