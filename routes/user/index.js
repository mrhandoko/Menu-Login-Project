var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var Model = require('../../models')

// Salty
function salt() {
  var salt = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      salt += possible.charAt(Math.floor(Math.random() * possible.length));

  return salt
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/login', { title: 'Login Express', notification: '' });
});

router.post('/userAuth', function(req, res, next) {
  Model.User.find({where:{username: req.body.username}}).then(function(user){
    const hash = crypto.createHmac('sha256', user.salt).update(req.body.password).digest('hex')

    if (user.username === req.body.username && user.password === hash) {
      res.redirect('dashboard')
    } else {
      res.render('user/login', { title: 'Login Express', notification: 'Invalid username & password' })
    }
  }).catch(function(){
    res.render('user/login', { title: 'Login Express', notification: 'Invalid username & password' })
  })
})

router.get('/dashboard', function(req, res, next) {
  Model.User.findAll({include:[Model.Role]}).then(function(users){
    res.render('user/dashboard', {users: users})
  })
})

router.get('/register', function(req, res, next) {
  Model.Role.findAll().then(function(roles){
    res.render('user/register', {notification : '', roles: roles})
  })
})

router.post('/createNewUser', function(req, res, next) {
  var salty = salt()
  if (req.body.username === '' && req.body.fullname === '' && req.body.password === '' && req.body.role === '') {
    res.render('user/register', {notification : 'Empty forms is not allowed' })
  } else {
    const hash = crypto.createHmac('sha256', salty).update(req.body.password).digest('hex');
    console.log(salty);
    Model.User.create({
      username : req.body.username,
      fullname : req.body.fullname,
      email : req.body.email,
      RoleId : req.body.role,
      password : hash,
      salt : salty
    }).then(function() {
      res.redirect('dashboard')
    })
  }
})

router.get('/delete/:id', function(req, res, next) {
  Model.User.destroy({where:{id: req.params.id}}).then(function() {
    res.redirect('/users/dashboard')
  })
})

router.get('/edit/:id', function(req, res, next){
  Model.User.find({where:{id: req.params.id}}).then(function(user){
    Model.Role.findAll().then(function(roles){
      res.render('user/edit_user', {user : user, notification: '', roles: roles})
    })
  })
})

router.post('/update/:id', function(req, res, next) {
  var salty = salt()
  Model.User.find({where:{id: req.params.id}}).then(function(user){
    if (req.body.username === '' && req.body.fullname === '' && req.body.password === '' && req.body.role === '') {
      res.render('user/edit_user', {notification : 'Empty forms is not allowed' })
    } else {
    const hash = crypto.createHmac('sha256', salty).update(req.body.password).digest('hex')
      Model.User.update({
        username : req.body.username,
        fullname : req.body.fullname,
        email : req.body.email,
        password : hash,
        RoleId : req.body.role,
        salt : salty
      } , {where:{id: req.params.id}}).then(function() {
        res.redirect('/users/dashboard')
      }).catch(function() {
        res.redirect('/users/dashboard')
      })
    }
  })
})

module.exports = router;
