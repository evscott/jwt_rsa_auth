const express = require("express");
const router = express.Router();
const middleware = require("../utilities/middleware");
const handler = require("../utilities/authHandler");

// Basic routes
router.post("/login", handler.login);
router.get("/", middleware.checkToken, handler.index);

// Export routes
module.exports = router;
