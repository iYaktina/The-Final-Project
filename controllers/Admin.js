const Users = require("../models/User");
const Order = require("../models/Order");
const path = require("path");
const fs = require("fs");

const AddUser = async (req, res) => {
	const { username, email, password, passwordConfirm } = req.body;

	if (password !== passwordConfirm) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	try {
		const existingUser = await Users.findOne({ email: email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Email is already registered" });
		} else {
			const newUser = new Users({
				username: username,
				email: email,
				password: password,
				role: "user",
			});

			await newUser.save();
			return res
				.status(201)
				.json({ message: "User created successfully" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Server error" });
	}
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
	GetUser,
	DeleteUser,
	toAdmin,
	toClient,
	AddUser,
};
