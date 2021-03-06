var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    middleware      = require("../middleware");
    
    
// COMMENT FORM
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found")
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});
// EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found")
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    });
});
//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found")
            res.redirect("back")
        } else {
            req.flash("success", "Comment updated")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})
// CREATE NEW COMMENT
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found")
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comments, function(err, comment){
               if(err || !comment){
                   req.flash("error", "Comment not found")
                   res.redirect("back");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
           });
       }
    });
    
});
// DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found")
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
