const Recept = require("../models/Recept");

async function postujRecept(req, res) {
	const newRecept = new Recept(req.body);
	try {
		await newRecept.save();
		res.status(201).json(newRecept);
	} catch (err) {
		res.status(400).json({ message: "Neispravan zahtev.", error: err });
	}
}

async function sviRecepti(req, res) {
	const filter = {};

	if (req.query.kategorija) filter.kategorija = req.query.kategorija;
	if (req.query.excludeKategorija)
		filter.excludeKategorija = { $ne: req.query.excludeKategorija };
	if (req.query.longerThan)
		filter.vremePripreme = { $gt: +req.query.longerThan };
	if (req.query.shorterThan)
		filter.vremePripreme = { $lt: +req.query.shorterThan };
	if (req.query.names) filter.sastojci = { $all: req.query.names.split(",") };
	if (req.query.excludeNames)
		filter.sastojci = { $nin: req.query.excludeNames.split(",") };

	const sortField = req.query.sortBy || "nazivHrane";
	const sortOrder = req.query.order === "desc" ? -1 : 1;
	const limit = Number(req.query.limit) || 0;
	const skip = Number(req.query.skip) || 0;
	const recepti = await Recept.find(filter)
		.sort({ [sortField]: sortOrder })
		.limit(limit)
		.skip(skip);

	res.json(recepti);
}

// Paginacija radi tako sto se query parametri page i limit salju u zahtevu
// npr: /recepti?page=2&limit=5
// page predstavlja broj strane, a limit broj elemenata po strani
// Ukoliko nisu poslati, podrazumevane vrednosti su page=1 i limit=10

async function jedanRecept(req, res) {
	const id = req.params.id;
	const recept = await Recept.findById(id);
	res.json(recept);
	if (!recept) return res.status(404).json("Nepostojeci recept.");
}

async function zameniRecept(req, res) {
	try {
		const updated = await Recept.replaceOne({ _id: req.params.id }, req.body);
		if (updated.matchedCount === 0)
			return res.status(404).json("Ne postoji recept sa ovim id-jem.");
		const recept = await Recept.findById(req.params.id);
		res.json(recept);
	} catch (err) {
		res.json({ message: "Los zahtev.", error: err });
	}
}

async function zameniSastojak(req, res) {
	const id = req.params.id;
	try {
		const updated = await Recept.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated)
			return res.staus(404).json("Nepostoji recept sa ovim id-jem.");
		res.json(updated);
	} catch (err) {
		res.status(400).json({ message: "Los zahtev.", error: err });
	}
}

async function izbrisiRecept(req, res) {
	const id = req.params.id;
	try {
		deleted = await Recept.findByIdAndDelete(id);
		if (!deleted)
			return res.json(404).json("Ne postoji recept sa ovim id-jem.");
		res.json(deleted);
	} catch (err) {
		res.status(400).json({ message: "Los zahtev.", error: err });
	}
}

module.exports = {
	postujRecept,
	sviRecepti,
	zameniRecept,
	zameniSastojak,
	izbrisiRecept,
	jedanRecept,
};
