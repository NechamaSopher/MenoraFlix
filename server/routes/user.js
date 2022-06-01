const express = require("express");
const { signin, login } = require("../controllers/user.js");
const decodeToken = require('../middleware/decodeToken');

const router = express.Router();

router.post('/signin', decodeToken, signin);
router.post('/login', decodeToken, login);


module.exports = router;
