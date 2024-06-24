const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("index", { loggedInUser: loggedInUser, title: "Home" });
});

router.get("/bmw", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Bmw", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Bmw",
	});
});

router.get("/mercedes", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Mercedes", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Mercedes",
	});
});

router.get("/porsche", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Porsche", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Porsche",
	});
});

router.get("/rangerover", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Rangerover", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "RangeRover",
	});
});

router.get("/mclaren", async (req, res) => {
	const loggedInUser = req.session.user;
	try {
		const cars = await Car.find({ carBrand: "McLaren" });
		res.render("mclaren", {
			cars,
			loggedInUser: loggedInUser,
			isLoggedIn: loggedInUser ? true : false,
			title: "McLaren",
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

module.exports = router;
