const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		last4Digits: {
			type: String,
			required: true,
			length: 4, // Assuming you want exactly 4 digits
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		price: {
			type: Number,
			required: true,
		},
		car: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
