var Campground  = require("../models/campground.js"),
    Comment     = require("../models/comment.js");


module.exports = {
    checkCommentOwnership: 
        function(req, res, next){
         if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err || !foundComment){
                    req.flash("error", "Comment not found")
                    res.redirect("back");
                 } else {
                    if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that")
                        res.redirect("back");
                    }
                }
            }); 
            } else {
                req.flash("error", "You must be logged in to do that")
                res.redirect("back");
            }
        },
    checkCampgroundOwnership:
        function(req, res, next){
         if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err || !foundCampground){
                    req.flash("error", "Something went wrong!")
                    res.redirect("back");
                 } else {
                    if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that")
                        res.redirect("back");
                    }
                }
            }); 
            } else {
                req.flash("error", "You need to be logged in to do that")
                res.redirect("back");
            }
    },
    isLoggedIn:
        function(req, res, next){  // Checks if a user is logged in for access to comments
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that")
    res.redirect("/login");
}
    
}