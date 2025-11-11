const Rating = require("../models/Rating");

async function createRating(req, res) {
	const newRating = new Rating(req.body);
	try {
		await newRating.save();
		res.status(201).json(newRating);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getAllRatings(req, res) {
	const ratings = await Rating.find();
	res.json(ratings);
}

async function getOneRating(req, res) {
	const id = req.params.id;
	try {
		const rating = await Rating.findById(id);
		if (!rating) return res.status(404).json(404);
		res.json(rating);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function replaceRating(req, res) {
	const id = req.params.id;
	try {
		const updated = await Rating.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).json(404);
		const rating = await Rating.findById(id);
		res.json(rating);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function deleteRating(req, res) {
	const id = req.params.id;
	try {
		const deleted = await Rating.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json(404);
		res.json(deleted);
	} catch (err) {
		res.status(400).json(err);
	}
}

module.exports = {
	createRating,
	getAllRatings,
	getOneRating,
	replaceRating,
	deleteRating,
};
