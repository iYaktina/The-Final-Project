const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
	{
		last4Digits: {
			type: String,
			required: true,
			length: 4,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now,
		},
		price: {
			type: String,
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

		color: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);


