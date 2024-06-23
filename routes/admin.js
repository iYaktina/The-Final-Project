const express = require("express");
var bodyParser = require("body-parser");
const Admin = require("../controllers/Admin");
const router = express.Router();
router.use(bodyParser.json());

router.get("/Adminpart", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Adminpart", {
		loggedInUser: loggedInUser,
		title: "Admin Menu",
	});
});

router.post("/AddUser", Admin.AddUser);
module.exports = router;
