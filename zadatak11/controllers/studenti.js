const Student = require("../models/Student");

async function dodajStudenta(req, res) {
	const noviStudent = new Student(req.body);
	try {
		await noviStudent.save();
		res.status(201).json(noviStudent);
	} catch (err) {
		res.status(400).json({ message: "Neispravan zahtev.", error: err });
	}
}

async function jedanStudent(req, res) {
	const id = req.params.id;
	const student = await Student.findById(id);
	if (!student) return res.status(404).json("Nepostojeci student.");
	res.json(student);
}

async function sviStudenti(req, res) {
	const filter = {};

	if (req.params.city) filter.city = req.params.city;
	if (req.params.excludeCity) filter.city = { $ne: req.params.city };
	if (req.params.minAge) filter.age = { $gt: Number(req.params.minAge) };
	if (req.params.maxAge) filter.age = { $lt: Number(req.params.maxAge) };
	if (req.params.nameContains)
		filter.name = { $regex: req.params.nameContains, $options: "i" };

	const sortField = req.query.sortBy || "age";
	const sortOrder = req.query.order === "desc" ? -1 : 1;
	const limit = +req.query.limit || 10;
	const skip = +req.query.skip || 0;

	const students = await Student.find(filter)
		.sort({ [sortField]: sortOrder })
		.limit(limit)
		.skip(skip);

	res.json(students);
}

async function zameniStudenta(req, res) {
	try {
		const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updated)
			return res.status(404).json("Ne postoji student sa ovim id-jem.");
		res.json(updated);
	} catch (err) {
		res.status(400).json({ message: "Neispravan zahtev.", error: err });
	}
}

async function izbrisiStudenta(req, res) {
	const id = req.params.id;
	try {
		const deleted = await Student.findByIdAndDelete(id);
		if (!deleted)
			return res.status(404).json("Ne postoji student sa ovim id-jem.");
		res.json(deleted);
	} catch (err) {
		res.status(400).json({ message: "Neispravan zahtev.", error: err });
	}
}

module.exports = {
	dodajStudenta,
	jedanStudent,
	zameniStudenta,
	izbrisiStudenta,
	sviStudenti,
};
