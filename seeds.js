var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
// Data for the campground to use in the seedDB function
const data = [
    {
    name: "Foggy Hill",
    image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg",
    description: "Illud dico, ea, quae dicat, praeclare inter se cohaerere. Compensabatur, inquit, cum summis doloribus laetitia. Cur igitur, inquam, res tam dissimiles eodem nomine appellas? Si longus, levis. Istam voluptatem perpetuam quis potest praestare sapienti? Etsi ea quidem, quae adhuc dixisti, quamvis ad aetatem recte isto modo dicerentur. At cum de plurimis eadem dicit, tum certe de maximis. Falli igitur possumus. Id est enim, de quo quaerimus. Heri, inquam, ludis commissis ex urbe profectus veni ad vesperum. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Tu enim ista lenius, hic Stoicorum more nos vexat. Aliter autem vobis placet. Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Quasi ego id curem, quid ille aiat aut neget."
    },
    {
    name: "Twin Rivers",
    image: "https://images.unsplash.com/photo-1504818428499-3f5b34498740?w=750&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "Beautiful scenery and majestic mountain. Id est enim, de quo quaerimus. Heri, inquam, ludis commissis ex urbe profectus veni ad vesperum. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Tu enim ista lenius, hic Stoicorum more nos vexat. Aliter autem vobis placet. Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Quasi ego id curem, quid ille aiat aut neget. Id est enim, de quo quaerimus. Heri, inquam, ludis commissis ex urbe profectus veni ad vesperum. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Tu enim ista lenius, hic Stoicorum more nos vexat. Aliter autem vobis placet. Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Quasi ego id curem, quid ille aiat aut neget."
    },
    {
    name: "The Tree House",
    image: "https://farm1.staticflickr.com/93/246477439_5ea3e472a0.jpg",
    description: "Huge house with nothing around except nature Lorem ipsum dolor sit amet, consectetur adipiscing elit. Murenam te accusante defenderem. Sed quid ages tandem, si utilitas ab amicitia, ut fit saepe, defecerit? Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Duo Reges: constructio interrete. Ita ne hoc quidem modo paria peccata sunt. Quid ergo attinet gloriose loqui, nisi constanter loquare? An vero, inquit, quisquam potest probare, quod perceptfum, quod. Haec para/doca illi, nos admirabilia dicamus. Qua tu etiam inprudens utebare non numquam. Id est enim, de quo quaerimus. Heri, inquam, ludis commissis ex urbe profectus veni ad vesperum. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Tu enim ista lenius, hic Stoicorum more nos vexat. Aliter autem vobis placet. Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Quasi ego id curem, quid ille aiat aut neget."
    }
];
// Write function to use in app.js to seed the database when we start the app
function seedDB(){
    // Wipe Database clean
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Campgrounds removed.");
                // Add Campgrounds // Need to have in callback so the order is guarenteed. 
            data.forEach(function(seed){
                Campground.create(seed, function(err, newCampground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campground added.");
                        //Create Comment
                        Comment.create({
                            text: "This place is great but I wish they had WiFi.",
                            author: "Beavis"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                                newCampground.comments.push(comment)
                                newCampground.save();
                                console.log("Comment added.")
                            }
                        })
                    }
                });
            });
        }
    });
    
}

module.exports = seedDB;
