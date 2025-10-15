const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const mainCtrlr = require("../controllers/mainController");

/*
GET / Home
*/
router.get("", mainCtrlr.home);

/*
GET / Sobre
*/
router.get("/sobre", mainCtrlr.sobre);

/*
GET / Post : id
*/
router.get("/post/:id", mainCtrlr.postId);

/*
POST / Post - searchTerm
*/
router.post("/search", mainCtrlr.searchTerm);

module.exports = router;
