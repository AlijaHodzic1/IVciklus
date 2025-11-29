import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password)
			return res.status(400).json({ message: "All fields required." });

		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ message: "Email already in use." });

		const user = await User.create({ username, email, password });

		const token = generateToken(user._id);

		res.status(201).json({
			message: "Registered successfully.",
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error." });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials." });

		const isMatch = await user.comparePassword(password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials." });

		const token = generateToken(user._id);

		res.status(200).json({
			message: "Logged in.",
			token,
			user: {
				id: user._id,
				username: user.username,
			},
		});
	} catch (err) {
		res.status(500).json({ message: "Server error." });
	}
};
