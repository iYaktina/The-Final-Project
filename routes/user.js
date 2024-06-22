const express = require("express");
var bodyParser = require("body-parser");
const userController = require("../controllers/User");
const router = express.Router();
router.use(bodyParser.json());

const User = require("../controllers/User");

router.get("/login", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("login", {
		loggedInUser: loggedInUser,
		title: "Login",
	});
});

router.get("/Accountinfo", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Accountinfo", {
		loggedInUser: loggedInUser,
		title: "Account Information",
	});
});
router.get("/signup", (req, res) => {
	res.render("signup", { title: "Signup" });
});

router.get("/forget-password", (req, res) => {
	res.render("forget-password", { title: "forgetPassword" });
});
router.get("/reset-password/:token", (req, res) => {
	res.render("reset-password", { title: "resetPassword" });
});

router.post("/forget-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

router.get("/customization", (req, res) => {
	res.render("customization", {
		title: "Customization",
	});
});
router.get("/user/:userId", userController.getUserById);
router.put("/user/:userId", userController.updateUserById);

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});

module.exports = router;
