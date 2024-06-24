const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
	{
		carBrand: { type: String, required: true },
		carModel: { type: String, required: true },
		manufacturYear: { type: String },
		carDescription: { type: String },
		carPrice: { type: Number },
		carImages: { type: [String] }, // Array of image file paths
		carVideos: { type: [String] }, // Array of video file paths
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
