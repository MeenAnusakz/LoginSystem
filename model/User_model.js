var mongoose = require('mongoose');
var url = 'mongodb://localhost/users';
var bcrypt = require('bcryptjs');

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var UserSchema = mongoose.Schema({
    username : {
        type: String, require: true,
    },
    password : {
        type: String, require: true, min: 4, max: 20,
    },
    email : {
        type: String, require: true, lowercase: true, trim: true
    },
    firstname : {
        type: String, require: true
    },
    lastname : {
        type: String, require: true
    },
    Date :{
        type: Date,
        default: Date.now 
    }
})

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.newUsers = function(newUser ,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}
module.exports.findUserByID = function(id,callback){
    User.findById(id,callback);
}
module.exports.findUserByName = function(username,callback){
    var username = {
        username : username
    }
    User.findOne(username,callback);
}
module.exports.conparepassword = function(password,hash,callback){
    bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null,isMatch);
    });
    
}