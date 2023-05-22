const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const placesController = require("../controllers/places");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Place Routes - simplified for now
// router.get("/place", ensureAuth, placesController.namePlace);

router.post("/new", ensureAuth, placesController.submitReport);
// router.post("/report", ensureAuth, placesController.giveReport);




module.exports = router;
