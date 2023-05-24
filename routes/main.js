const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const landingController = require("../controllers/landing");
const placesController = require("../controllers/places");
const mapController = require("../controllers/map");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", landingController.getLanding);
router.get("/home", ensureAuth, landingController.getHome);
router.get("/recieved", ensureAuth, landingController.getSuccess);
router.get("/place", ensureAuth, placesController.namePlace);
router.get("/map", ensureAuth, mapController.displayMap);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/getdata", ensureAuth, mapController.getData);

module.exports = router;
