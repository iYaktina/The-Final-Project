const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
	res.render("index", {
		user: req.session.user === undefined ? "" : req.session.user,
	});
});

router.get("/about", function (req, res) {
	res.render("about", {
		user: req.session.user === undefined ? "" : req.session.user,
	});
});

module.exports = router;
