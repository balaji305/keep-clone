const notesRoutes = require("./notes");
const authRoutes = require("./auth");

const router = require("express").Router();

router.all("/notes*", notesRoutes);

router.all("/auth*", authRoutes);

module.exports = router;
