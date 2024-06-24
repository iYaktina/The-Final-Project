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

const editUser = async (req, res) => {
	const { editUserId, editUsername, editEmail, editPassword } = req.body;

	try {
		const user = await Users.findById(editUserId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.username = editUsername || user.username;
		user.email = editEmail || user.email;
		if (editPassword) {
			user.password = editPassword;
		}

		await user.save();
		res.status(200).json({ message: "User updated successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Server error" });
	}
};

const removeUser = async (req, res) => {
	const { removeUserId } = req.body;

	try {
		await Users.findByIdAndDelete(removeUserId);

		res.status(200).json({ message: "User removed successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	AddUser,
	editUser,
	removeUser,
};
