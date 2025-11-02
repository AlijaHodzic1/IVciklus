const Teacher = require("../models/Teacher");

async function createTeacher(req, res) {
	try {
		const newTeacher = new Teacher(req.body);
		await newTeacher.save();
		res.status(201).json(newTeacher);
	} catch (err) {
		res.status(400).json({ message: "Los request.", error: err });
	}
}

async function getAllTeachers(req, res) {
	const teachers = await Teacher.find();
	res.json(teachers);
}

async function getTeacherById(req, res) {
	const id = +req.params.id;
	try {
		const teacher = await Teacher.findById(id);
		if (!teacher)
			return res.status(404).json("Teacher sa tim id-jem ne postoji.");
		res.json(teacher);
	} catch (err) {
		res.status(400).json({ message: "Pogresan format id-ja.", error: err });
	}
}

async function updateTeacher(req, res) {
	try {
		const teacher = await Teacher.findByIdAndUpdate(+req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!teacher)
			return res.status(404).send("Teacher sa tim id-jem ne postoji.");
		res.json(teacher);
	} catch {
		res.status(400).send("Pogresan format id-ja.");
	}
}

async function deleteTeacher(req, res) {
	try {
		const deleted = await Teacher.findByIdAndDelete(+req.params.id);
		if (!deleted)
			return res.status(404).send("Teacher sa ovim id-jem ne postoji.");
	} catch (err) {
		res
			.status(400)
			.send({ message: "Los rikvest. Format id-ja pogresan.", error: err });
	}
}

module.exports = {
	createTeacher,
	getAllTeachers,
	getTeacherById,
	updateTeacher,
	deleteTeacher,
};
