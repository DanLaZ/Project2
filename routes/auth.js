var authController = require('../controllers/authcontroller.js');
var db = require("../models");


 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
    
    app.get('/signin', authController.signin);
    
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }))
    
    app.get('/dashboard',isLoggedIn, authController.dashboard);
    
    app.get('/logout',authController.logout);

  app.get("/home", isLoggedIn, function(req, res) {
    res.send("this route is protected");
  });

  app.get("/logout", authController.logout);

  app.post("/signin", passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
};


function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){
        return next();
    }   
    res.redirect('/signin');
 
}

console.log("Auth is here to stay!!!");
};

