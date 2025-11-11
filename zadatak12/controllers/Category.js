const Category = require("../models/Category");

async function createCategory(req, res) {
	const newCategory = new Category(req.body);
	try {
		await newCategory.save();
		res.status(201).json(newCategory);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getAllCategories(req, res) {
	const categories = await Category.find();
	res.json(categories);
}
async function getOneCategory(req, res) {
	const id = req.params.id;
	try {
		const category = await Category.findById(id);
		if (!category) return res.status(404).json(404);
		res.json(category);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function replaceCategory(req, res) {
	const id = req.params.id;
	try {
		const updated = await Category.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).json(404);
		const category = await Category.findById(id);
		res.json(category);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function deleteCategory(req, res) {
	const id = req.params.id;
	try {
		const deleted = await Category.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json(404);
		res.json(deleted);
	} catch (err) {
		res.status(400).json(err);
	}
}

module.exports = {
	createCategory,
	getAllCategories,
	getOneCategory,
	replaceCategory,
	deleteCategory,
};
