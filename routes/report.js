const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports");
const placesController = require("../controllers/places");


const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Report Routes - simplified for now
router.get("/", ensureAuth, placesController.namePlace);

router.put("/edit/:id", reportsController.editReport);

router.delete("/delete/:id", reportsController.deleteReport);

// router.post("/createComment", reportsController.createComment);

module.exports = router;
