const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrpypt = require('bcrypt-nodejs')


//define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    unique: true,
  },
});

//On Save Hook, ecrypt password

userSchema.pre('save', function(next) {
  const user = this;
  bcrpypt.genSalt(10, function(err, salt){
    if (err) {
      return next(err)
    }
    bcrpypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err)}

      user.password = hash
      next()
    })

      
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrpypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {return callback(err) }

    callback(null, isMatch)
  })
}
const ModelClass = mongoose.model('user', userSchema);

//export the model

module.exports = ModelClass;