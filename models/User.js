const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		username: {
			type: String,
			required: true,
		},
		birthyear: {
			type: Number,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		Address: {
			type: String,
			required: false,
		},
		State: {
			type: String,
		},
		City: {
			type: String,
		},
		ZipCode: {
			type: Number,
		},
		Verification: {
			type: Boolean,
			default: false,
		},
		resetToken: {
			type: String,
			default: undefined,
		},
		resetTokenexp: {
			type: Date,
			default: undefined,
		},
		cardNumber: {
			type: String,
		},
		CVV: {
			type: Number,
		},
		ExpiryDate: {
			type: String,
		},
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

