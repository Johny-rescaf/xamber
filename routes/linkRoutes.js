"use strict";

const router = require("express").Router();

// Controllers
const linksController = require('../controllers/linksController');


// Get all links
router.get("/api/v1.0/links", linksController.getLinks);

// GET single link 
router.get("/api/v1.0/links/:urlCode", linksController.getSingleLink);

// Add a link (Generate a new link) 
router.post("/api/v1.0/links", linksController.addLink);

// GET single link 
router.put("/api/v1.0/links/:urlCode", linksController.updateLink);

// DELETE a link 
router.delete("/api/v1.0/links/:urlCode", linksController.deleteLink);


module.exports = router;
