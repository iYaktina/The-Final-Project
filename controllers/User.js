const User = require("../models/User");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const getUserById = (req, res) => {
	const userId = req.params.userId;
	User.findById(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Server error" });
		});
};

const updateUserById = (req, res) => {
	const userId = req.params.userId;
	const updatedData = req.body;
	console.log(`Updating user with ID: ${userId}`);
	console.log(`Data to update:`, updatedData);
	User.findByIdAndUpdate(userId, updatedData, { new: true })
		.then((updatedUser) => {
			if (!updatedUser) {
				return res.status(404).send("User not found");
			}
			console.log("User updated successfully:", updatedUser);
			res.json(updatedUser);
		})
		.catch((err) => {
			console.error("Error updating user:", err);
			res.status(500).send("Internal server error");
		});
};
const signup = async (req, res) => {
	const { username, email, password, confirm_password } = req.body;

	// Basic validation
	if (password !== confirm_password) {
		return res.send("Passwords do not match");
	}

	try {
		const existingUser = await User.findOne({ email: email });
		if (existingUser) {
			return res.send("Email is already registered");
		} else {
			const newUser = new User({
				username: username,
				email: email,
				password: password,
				role: "user",
			});

			await newUser.save();

			// Store user data in session
			req.session.user = newUser;
			res.redirect("/"); // Redirect to homepage after successful signup
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error");
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const loggedInUser = await User.findOne({
			$or: [{ email: email }, { username: email }],
			password: password,
		});

		if (loggedInUser) {
			// Store user data in session
			req.session.user = loggedInUser;
			res.redirect("/"); // Redirect to homepage after successful login
		} else {
			res.send("Invalid email or password"); // Handle invalid login
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("Server error");
	}
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: "No email found" });
		}

		const resetToken = crypto.randomBytes(64).toString("hex");
		user.resetToken = resetToken;
		user.resetTokenexp = Date.now() + 800000;

		await user.save();

		const transporter = nodemailer.createTransport({
			service: "hotmail",
			auth: {
				user: "WebMongodb@hotmail.com",
				pass: "miu12341234",
			},
		});

		const mailOptions = {
			from: "WebMongodb@hotmail.com",
			to: user.email,
			subject: "Password Reset",
			text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email:", error);
				return res.status(500).json({ error: "Error sending email" });
			} else {
				console.log("Email sent:", info.response);
				res.json({ message: "Email sent" });
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}
};

const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	try {
		const user = await User.findOne({
			resetToken: token,
			resetTokenexp: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(404).json({ error: "Invalid or expired token" });
		}

		user.password = hashingAlgorithm(newPassword);
		user.resetToken = undefined;
		user.resetTokenexp = undefined;
		await user.save();

		const transporter = nodemailer.createTransport({
			service: "hotmail",
			auth: {
				user: "selfvibes@outlook.com",
				pass: "account246810",
			},
		});

		const mailOptions = {
			from: "selfvibes@outlook.com",
			to: user.email,
			subject: "Password changed",
			text: `${user.username}, Your password has been changed. If you didn't request this change, please contact us immediately.`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email:", error);
				return res.status(500).json({ error: "Error sending email" });
			} else {
				console.log("Email sent:", info.response);
				res.json({ message: "Password updated successfully" });
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}
};

function hashingAlgorithm(pass) {
	return pass; // Replace with your actual hashing algorithm
}
module.exports = {
	signup,
	getUserById,
	updateUserById,
	login,
	forgotPassword,
	resetPassword,
};
