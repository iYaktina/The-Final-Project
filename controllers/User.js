const User = require("../models/User");
const Order = require("../models/Order");
const path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const getUserById = (req, res) => {
	const userId = req.params.userId;
	User.findById(userId)
		.populate("orders")
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

			req.session.user = newUser;
			res.redirect("/");
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
			req.session.user = loggedInUser;
			res.redirect("/");
		} else {
			res.send("Invalid email or password");
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
				user: "WebMongodb@hotmail.com",
				pass: "miu12341234",
			},
		});

		const mailOptions = {
			from: "WebMongodb@hotmail.com",
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
	return pass;
}

const getSavedCardInfo = async (req, res) => {
	try {
		const userId = req.session.user._id;
		const user = await User.findById(userId, "creditCard");

		if (user && user.creditCard) {
			const last4 = user.creditCard.number.slice(-4);
			res.json({ hasSavedCard: true, cardLast4: last4 });
		} else {
			res.json({ hasSavedCard: false });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
};
const addCreditCardInfo = async (req, res) => {
	try {
		const { cardNumber, CVV, expiryDate } = req.body;
		const userId = req.session.user._id;

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				cardNumber,
				CVV,
				expiryDate,
			},
			{ new: true }
		);

		if (updatedUser) {
			res.status(200).json({
				message: "Credit card information saved successfully",
			});
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
};

const updatecardinfo = async (req, res) => {
	try {
		const userId = req.session.user._id;
		const { cardNumber, expiryDate, cvv } = req.body;

		if (
			cardNumber.length < 13 ||
			cardNumber.length > 19 ||
			!/^\d+$/.test(cardNumber)
		) {
			return res.status(400).json({ error: "Invalid card number" });
		}
		if (cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
			return res.status(400).json({ error: "Invalid CVV" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (!user.cardNumber) {
			user.cardNumber = {};
		}
		user.cardNumber = maskCardNumber(cardNumber);
		user.ExpiryDate = expiryDate;

		await user.save();

		res.status(200).json({
			message: "Card information updated successfully",
			user: {
				cardNumber: user.cardNumber,
				expiryDate: user.ExpiryDate,
			},
		});
	} catch (err) {
		console.error("Error updating card information:", err);
		res.status(500).json({ error: "Server error" });
	}
};

function maskCardNumber(cardNumber) {
	return "**** **** **** " + cardNumber.slice(-4);
}

const updateaddInfo = async (req, res) => {
	try {
		const userId = req.session.user._id;
		const { Streetadd, City, State, Zipcode } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.Address = Streetadd;
		user.State = State;
		user.City = City;
		user.ZipCode = Zipcode;

		await user.save();

		res.status(200).json({
			message: "Address information updated successfully",
			user: {
				Streetadd: user.Address,
				State: user.State,
				City: user.City,
				Zipcode: user.ZipCode,
			},
		});
	} catch (err) {
		console.error("Error updating Address information:", err);
		res.status(500).json({ error: "Server error" });
	}
};

const NewOrder = async (req, res) => {
	try {
		const userId = req.session.user._id;
		const {
			Cardnumber,
			carprice,
			carname,
			caryear,
			carbrand,
			carcolor,
			cardesc,
		} = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const last4 = Cardnumber;
		const price = carprice;
		const car = carname;
		const brand = carbrand;
		const description = cardesc;
		const year = caryear;
		const color = carcolor;

		const newOrder = new Order({
			last4Digits: last4,
			price: price,
			car: car,
			brand: brand,
			description: description,
			year: year,
			color: color,
		});

		await newOrder.save();
		user.orders.push(newOrder._id);
		await user.save();
		res.status(200).json({
			message: "Order has been placed successfully",
			order: newOrder, 
		});
	} catch (err) {
		console.error("Error making Order information:", err);
		res.status(500).json({ error: "Server error" }); 
	}
};

const cancelOrder = async (req, res) => {
	const { userId, orderId } = req.params;
	try {
		await Order.findByIdAndDelete(orderId);

		await User.findByIdAndUpdate(userId, { $pull: { orders: orderId } });

		res.status(200).json({ message: "Order cancelled successfully" });
	} catch (error) {
		console.error("Error cancelling order:", error);
		res.status(500).json({ error: "Server error" });
	}
};

const getUserByIdWithOrders = async (req, res) => {
	const userId = req.params.userId;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 2; 

	try {
		const user = await User.findById(userId)
			.populate({
				path: "orders",
				options: {
					skip: (page - 1) * limit,
					limit: limit,
				},
			})
			.exec();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const totalOrders = await Order.countDocuments({
			_id: { $in: user.orders },
		});
		const totalPages = Math.ceil(totalOrders / limit);

		res.json({
			user: {
				username: user.username,
				email: user.email,
				birthyear: user.birthyear,
				Address: user.Address,
				State: user.State,
				City: user.City,
				ZipCode: user.ZipCode,
				cardNumber: user.cardNumber,
				ExpiryDate: user.ExpiryDate,
			},
			orders: user.orders,
			pagination: {
				totalOrders: totalOrders,
				totalPages: totalPages,
				currentPage: page,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = {
	signup,
	getUserById,
	updateUserById,
	login,
	forgotPassword,
	resetPassword,
	getSavedCardInfo,
	addCreditCardInfo,
	updatecardinfo,
	updateaddInfo,
	NewOrder,
	cancelOrder,
	getUserByIdWithOrders,
};
