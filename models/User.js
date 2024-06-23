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
/*
// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
*/
