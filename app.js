const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const app = express();

const dbURI =
	"mongodb+srv://webmongodb:miu12341234@cluster0.y4q8mqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const bodyParser = require("body-parser");
mongoose
	.connect(dbURI)
	.then((result) => app.listen(8080))
	.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "12341234123412341234123412341234",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);



const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use("/", indexRoutes);
app.use("/", adminRoutes);
app.use("/", userRoutes);

app.use((req, res) => {
	const loggedInUser = req.session.user;
	res.status(404).render("404", {
		loggedInUser: loggedInUser,
	});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

