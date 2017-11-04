var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User    = require("../models/user")

// ROOT ROUTE    
router.get("/", function(req, res){
   res.render("landing");
});

///////////////
// AUTH ROUTES
//////////////
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds");
        });
    }); 
});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash: "Login successful"
}), function(req, res){
});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You have logged out")
    res.redirect("/campgrounds");
});

module.exports = router;