const Manufacturer = require("../models/Manufacturer");

async function createManufacturer(req, res) {
	const newManufacturer = new Manufacturer(req.body);
	try {
		await newManufacturer.save();
		res.status(201).json(newManufacturer);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function getAllManufacturers(req, res) {
	const manufacturers = await Manufacturer.find();
	res.json(manufacturers);
}

async function getOneManufacturer(req, res) {
	const id = req.params.id;
	try {
		const manufacturer = await Manufacturer.findById(id);
		if (!manufacturer) return res.status(404).json(404);
		res.json(manufacturer);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function replaceManufacturer(req, res) {
	const id = req.params.id;
	try {
		const updated = await Manufacturer.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated) return res.status(404).json(404);
		const manufacturer = await Manufacturer.findById(id);
		res.json(manufacturer);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function deleteManufacturer(req, res) {
	const id = req.params.id;
	try {
		const deleted = await Manufacturer.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json(404);
		res.json(deleted);
	} catch (err) {
		res.status(400).json(err);
	}
}

module.exports = {
	createManufacturer,
	getAllManufacturers,
	getOneManufacturer,
	replaceManufacturer,
	deleteManufacturer,
};
