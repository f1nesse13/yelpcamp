var passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    localStrategy           = require("passport-local"), 
    geocoder                = require("geocoder"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    flash                   = require("connect-flash"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    // seedDB                  = require("./seeds"), // Used to seed DB during development
    app                     = express();
   
  ////    ROUTES  ////  
var commentRoutes           = require("./routes/comments"),
    campgroundRoutes        = require("./routes/campgrounds.js"),
    indexRoutes             = require("./routes/index.js");

mongoose.connect(process.env.DATABASEURL);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB(); // Seeds YelpCamp with campgrounds and comments for development

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: process.env.EXPRESSSECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser   = req.user;
    res.locals.error         = req.flash("error");
    res.locals.success       = req.flash("success");
    next();
});
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server listening");
});
