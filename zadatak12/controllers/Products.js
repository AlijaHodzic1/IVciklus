const Product = require("../models/Prodcut");

async function createProduct(req, res) {
	const newProduct = new Product(req.body);
	try {
		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).json(err);
	}
}
async function getAllProducts(req, res) {
	const filter = {};

	if (req.params.minPrice && req.params.maxPrice)
		filter.price = { $lte: +req.params.minPrice, $gte: +req.params.maxPrice };
	if (req.params.manufacturer)
		filter.manufacturer = { $in: req.params.manufacturer };

	const sortField = req.params.sortBy || "price";
	const sortBy = req.params.order === "desc" ? -1 : 1;
	const limit = Number(req.params.limit) || 0;
	const skip = Number(req.params.id) || 0;

	const products = await Product.find(filter)
		.sort({ [sortField]: sortBy })
		.limit(limit)
		.skip(skip);

	res.json(products);
}
async function getOneProduct(req, res) {
	const id = +req.params.id;
	try {
		const product = await Product.findById(id);
		if (!product) return res.status(404).json(404);
		res.json(product);
	} catch (err) {
		res.status(400).json(err);
	}
}
async function replaceProduct(req, res) {
	const id = +req.params.id;
	try {
		const updated = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).json(404);
		const product = await Product.findById(id);
		res.json(product);
	} catch (err) {
		res.status(400).json(400);
	}
}

async function deleteProduct(req, res) {
	const id = req.params.id;
	try {
		const deleted = await Product.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json(404);
		res.json(deleted);
	} catch (err) {
		res.status(400).json(err);
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	getOneProduct,
	replaceProduct,
	deleteProduct,
};
