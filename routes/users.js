var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var User = require('../model/User_model');
var LocalStrategy = require('passport-local');
var passport = require('passport');

/* GET users listing. */

router.get('/register', (req, res, next) => {
  res.render('user/register.ejs')
})
router.post('/register', [
  check('username', 'Please enter a username').not().isEmpty(),
  check('password','Plese enter a password 4>20 Charater').isLength({min:4, max:20}),
  check('email', 'Please enter a email').isEmail().isLowercase().trim(),
  check('firstname', 'Please enter a firstname').not().isEmpty(),
  check('lastname', 'Please enter a lastname').not().isEmpty(),
], (req, res, next) => {
  var Result = validationResult(req);
  var errors = Result.errors;
  if (!Result.isEmpty()) {
    res.render('user/register.ejs', {
      errors: errors
    })
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
    User.newUsers(newUser, function (err, user) {
      if (err) throw err;
    })
    res.redirect('/users/login');
  }
})

router.get('/login', (req, res, next) => {
  res.render('user/login.ejs')
})
router.post('/login',passport.authenticate('local',{
  failureRedirect: '/users/login'
}),(req,res,next)=>{
  res.redirect('/')
})
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/users/login')
})





passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findUserByName(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      User.conparepassword(password, user.password, function (err, isMatch) {
        if (err) { return done(err); }
        if(isMatch){
          return done(null,user);
        }else{
          return done(null,false);
        }
      })
    })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findUserByID(id, function (err, user) {
    done(err, user)
  })
});

module.exports = router;
