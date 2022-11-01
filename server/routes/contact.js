let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");



let contactController = require("../controllers/contact");


// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  }

/* GET Route for the contact List page - READ OPeration */
router.get("/", contactController.displaycontactList);

/* GET Route for displaying Add page - Create OPeration */
router.get("/add", requireAuth, contactController.addpage);

/* POST Route for processing Add page - Create OPeration */
router.post("/add", requireAuth, contactController.addprocesspage);

/* GET Route for displaying Edit page -UPDATE OPeration */
router.get("/edit/:id", requireAuth, contactController.displayeditpage);

/*POST Route for processing Edit page - UPDATE OPeration */
router.post("/edit/:id", requireAuth, contactController.processingeditpage);

/* GET to perform contact deletion -Delete OPeration */
router.get("/delete/:id", requireAuth, contactController.deletepage);
module.exports = router;