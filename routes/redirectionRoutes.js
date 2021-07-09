"use strict";

const router = require("express").Router();

// Controllers
const redirectionController = require('../controllers/redirectionController');


// Get all links
router.get("/:urlCode", redirectionController.redirectToLink);

module.exports = router;
