const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
 
//Comment Routes - simplified for now
router.post("/newComment/:id", commentsController.newComment);
// 
module.exports = router;
