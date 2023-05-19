const express = require("express");
const router = express.Router();
const mapController = require("../controllers/map");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//search route - simplified for now
router.get("/", ensureAuth, mapController.displayMap);
router.get("/search/", ensureAuth, mapController.getPlace);



module.exports = router;
