const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const user = require("./models/User");
const app = express();
const dbURI =
	"mongodb+srv://webmongodb:miu12341234@cluster0.y4q8mqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const crypto = require("crypto");
const nodemailer = require("nodemailer");

mongoose
	.connect(dbURI)
	.then((result) => app.listen(8080))
	.catch((err) => console.log(err));

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure and use session middleware
app.use(
	session({
		secret: "12341234123412341234123412341234", // replace with your secret key
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // set to true if using https
	})
);

// Define routes

app.get("/", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("index", { loggedInUser: loggedInUser, title: "Home" });
});

app.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

// Authentication route - handles POST request for login
app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	//back end authentication for hotmail or gmail
	try {
		const loggedInUser = await user.findOne({
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
});

// Logout route - destroys session and clears cookies
app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.redirect("/");
		}
		res.clearCookie("connect.sid");
		res.redirect("/");
	});
});

app.get("/forget-password", (req, res) => {
	res.render("forget-password", { title: "forgetPassword" });
});

app.post("/forget-password", async (req, res) => {
	const { email } = req.body;

	try {
		const user2 = await user.findOne({ email });
		if (!user2) {
			return res.status(404).json({ error: "No email Found" });
		}

		const resetToken = crypto.randomBytes(64).toString("hex");
		user2.resetToken = resetToken;
		user2.resetTokenexp = Date.now() + 800000;

		await user2.save();

		const transporter = nodemailer.createTransport({
			service: "hotmail",
			auth: {
				user: "email",
				pass: "pass",
			},
		});

		const mailOptions = {
			from: "email",
			to: user2.email,
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
		res.status(500).json({ error: "server error" });
	}
});

app.get("/reset-password/:token", (req, res) => {
	res.render("reset-password", { title: "resetPassword" });
});

app.post("/reset-password/:token", async (req, res) => {
	const { token } = req.params;
	const { newPassword } = req.body;

	try {
		const user2 = await user.findOne({
			resetToken: token,
			resetTokenexp: { $gt: Date.now() },
		});

		if (user2) {
			user2.password = hashingAlgorithm(newPassword);
			user2.resetToken = undefined;
			user2.resetTokenexp = undefined;
			await user2.save();
			res.json({ message: "Password Done" });

			const transporter = nodemailer.createTransport({
				service: "hotmail",
				auth: {
					user: "selfvibes@outlook.com",
					pass: "account246810",
				},
			});

			const mailOptions = {
				from: "selfvibes@outlook.com",
				to: user2.email,
				subject: "Password changed",
				text: `${user2.username} , Your password has been changed , If you didn't request for your password to be changed please contact us `,
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error("Error sending email:", error);
					return res
						.status(500)
						.json({ error: "Error sending email" });
				} else {
					console.log("Email sent:", info.response);
					res.json({ message: "Email sent" });
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
});

function hashingAlgorithm(pass) {
	return pass;
}
// Homepage route

// Example route to display user info for testing
/*app.get('/profile', (req, res) => {
    const loggedInUser = req.session.user;
    if (loggedInUser) {
        res.send(`Hello, ${loggedInUser.email}!`);
    } else {
        res.redirect('/login');
    }
});*/

app.get("/bmw", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Bmw", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Bmw",
	});
});

app.get("/mercedes", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Mercedes", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Mercedes",
	});
});

app.get("/porsche", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Porsche", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "Porsche",
	});
});

app.get("/rangerover", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Rangerover", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "RangeRover",
	});
});

app.get("/customization", (req, res) => {
	res.render("customization", {
		title: "Customization",
	});
});

app.get("/mclaren", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Mclaren", {
		loggedInUser: loggedInUser,
		isLoggedIn: loggedInUser ? true : false,
		title: "McLaren",
	});
});

app.get("/signup", (req, res) => {
	res.render("signup", { title: "Signup" });
});

app.post("/signup", async (req, res) => {
	const { username, email, password, confirm_password } = req.body;

	// Basic validation
	if (password !== confirm_password) {
		return res.send("Passwords do not match");
	}

	try {
		const existingUser = await user.findOne({ email: email });
		if (existingUser) {
			return res.send("Email is already registered");
		} else {
			const newUser = new user({
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
});

app.get("/Accountinfo", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Accountinfo", {
		loggedInUser: loggedInUser,
		title: "Account Information",
	});
});

app.get("/Adminpart", (req, res) => {
	const loggedInUser = req.session.user;
	res.render("Adminpart", {
		loggedInUser: loggedInUser,
		title: "Admin Menu",
	});
});

app.get("/user/:userId", (req, res) => {
	const userId = req.params.userId;
	user.findById(userId)
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
