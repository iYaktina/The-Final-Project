const Users = require("../models/User");
const path = require("path");

// Add a new user with an image upload
const AddUser = (req, res) => {
	let imgFile;
	let uploadPath;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	imgFile = req.files.img;
	uploadPath = path.join(
		__dirname,
		"../public/images/" + req.body.username + ".png"
	);

	// Use the mv() method to place the file somewhere on your server
	imgFile.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err);
		}

		const newUser = new Users({
			UserName: req.body.username,
			Password: req.body.password,
			Image: req.body.username + ".png",
			Type: req.body.type,
			Name: req.body.name,
			BirthYear: req.body.birthyear,
			Email: req.body.email,
		});

		newUser
			.save()
			.then((result) => {
				res.redirect("/");
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

// Get a user by username and password
const GetUser = (req, res) => {
	const query = { UserName: req.body.username, Password: req.body.password };
	Users.findOne(query)
		.then((result) => {
			if (!result) {
				return res.status(404).send("User not found");
			}
			req.session.user = result;
			res.redirect("/user/profile");
		})
		.catch((err) => {
			console.log(err);
		});
};

// Check if a username is taken
const checkUN = (req, res) => {
	const query = { UserName: req.body.username };
	Users.find(query)
		.then((result) => {
			if (result.length > 0) {
				res.send("taken");
			} else {
				res.send("available");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

// Edit user information
const editUser = (req, res) => {
	const updateData = {
		Password: req.body.password,
		Name: req.body.name,
		BirthYear: req.body.birthyear,
		Email: req.body.email,
	};

	Users.findByIdAndUpdate(req.session.user._id, updateData, { new: true })
		.then((result) => {
			req.session.user = result;
			res.redirect("/user/profile");
		})
		.catch((err) => {
			console.log(err);
		});
};

// Fetch user data
const fetchUserData = (req, res) => {
	Users.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Server error" });
		});
};

// Update user data
const updateUser = (req, res) => {
	const updateData = {
		name: req.body.name,
		username: req.body.username,
		birthyear: req.body.birthyear,
		email: req.body.email,
	};

	Users.findByIdAndUpdate(req.params.id, updateData, { new: true })
		.then((updatedUser) => {
			if (!updatedUser) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json(updatedUser);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Server error" });
		});
};

module.exports = {
	AddUser,
	GetUser,
	checkUN,
	editUser,
	fetchUserData,
	updateUser,
};
