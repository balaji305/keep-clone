const { login, signUp } = require("../controllers/authHandler");

const router = require("express").Router();

router.post("/auth/login", login);
router.post("/auth/signup", signUp);

module.exports = router;
