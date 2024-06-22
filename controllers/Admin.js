const Users = require("../models/User");
const Order = require("../models/Order");
const path = require("path");
const fs = require("fs");

const getAdminDashboard = (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Adminpart", {
		loggedInUser: loggedInUser,
		title: "Admin Menu",
	});
};

const GetAllUsers = (req, res) => {
	Users.find()
		.then((result) => {
			res.render("viewAll", {
				users: result,
				user: req.session.user === undefined ? "" : req.session.user,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const GetUser = (req, res) => {
	var query = { _id: req.params.id };
	Users.findOne(query)
		.then((result) => {
			res.render("emp", {
				emp: result,
				user: req.session.user === undefined ? "" : req.session.user,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

const DeleteUser = (req, res) => {
	Users.findByIdAndDelete(req.params.id)
		.then((result) => {
			fs.unlink(
				path.join(__dirname, "../public/images/" + req.params.img),
				(err) => {
					if (err) {
						throw err;
					}
					res.redirect("/admin/viewAll");
				}
			);
		})
		.catch((err) => {
			console.log(err);
		});
};

const toAdmin = (req, res) => {
	Users.findByIdAndUpdate(req.params.id, { Type: "admin" })
		.then((result) => {
			res.redirect("/admin/viewAll");
		})
		.catch((err) => {
			console.log(err);
		});
};

const toClient = (req, res) => {
	Users.findByIdAndUpdate(req.params.id, { Type: "client" })
		.then((result) => {
			res.redirect("/admin/viewAll");
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	GetAllUsers,
	GetUser,
	DeleteUser,
	toAdmin,
	toClient,
	getAdminDashboard,
};
