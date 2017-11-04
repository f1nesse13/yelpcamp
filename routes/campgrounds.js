var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campground"),
    geocoder        = require("geocoder"),
    middleware      = require("../middleware");
// SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                req.flash("error", "Something went wrong")
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});   
            }
        });
        
});
// ADD A NEW CAMPGROUND (FORM)
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
// ADD NEW CAMPGROUND(ROUTE)
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var cost = req.body.cost;
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Something went wrong")
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});
//SHOW CAMPGROUND
router.get("/:id", function(req,res){
    // Find a campground and show info about it
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found")
                res.redirect("back");
            } else {
                res.render("campgrounds/show", {campground: foundCampground});   
            }
        });
        
    
});
// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Campground not found")
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: campground});
        } 
    }); 
 });
// UPDATE CAMPGROUND
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully updated " + campground);
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});
// DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Campground not found")
            res.redirect("/campgrounds");
        } else {
            req.flash("success", campground + " deleted successfully");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;