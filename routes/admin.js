const express = require("express");
var bodyParser = require("body-parser");
const Admin = require("../controllers/Admin");
const Users = require("../models/User");
const router = express.Router();
router.use(bodyParser.json());

router.get("/Adminpart", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Adminpart", {
		loggedInUser: loggedInUser,
		title: "Admin Menu",
	});
});

router.get("/users", async (req, res) => {
	try {
		const users = await Users.find();
		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error");
	}
});
router.post("/removeUser", Admin.removeUser);
router.post("/editUser", Admin.editUser);
router.post("/AddUser", Admin.AddUser);
module.exports = router;
