// Routes.js
const express = require("express")
const router = express.Router();

const userRoutes = require('./userRoutes.js') // import user route
router.use(userRoutes) // use user route
module.exports = router;