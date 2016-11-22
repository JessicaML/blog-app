var express = require('express'),
    bcrypt = require('bcrypt'),
    db = require('../models'),
    session = require('express-session'),
    router = express.Router();

    var db = require('../models');

router.use(session({
   secret: 'our secret key',
   resave: true,
   saveUninitialized: true
 }));

//gets register page
router.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/posts');
  }
  res.render('users/new');
});

//posts register data to db
router.post('/register', (req, res) => {
  db.User.create(req.body).then((user) => {
    req.session.user = user;
    res.redirect('/');
  }).catch((error) => {
    res.render('users/new', { errors: error.errors });
  });
});

console.log('gonna be yuge');

//logs in user
router.post('/login', (req, res) => {
  console.log('gonna be yuge');
  console.log(req.body.email);
  console.log(userInDB.passwordDigest);
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((userInDB) => {
    bcrypt.compare(req.body.password, userInDB.passwordDigest, (error, result) => {
      if (result) {
        req.session.user = userInDB;
        res.direct('/');
      } else {
        res.render('login', { error: {message: 'Password is incorrect' } });
      }
    });
  }).catch((error) => {
    res.render('login', { error: { message: 'User not found in the database' } });
  });
});

//logs out user
router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
});

module.exports = router;
