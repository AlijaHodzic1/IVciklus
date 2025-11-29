const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 6,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
