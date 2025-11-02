const Course = require("../models/Course");

async function createCourse(req, res) {
	try {
		const newCourse = new Course(req.body);
		await newCourse.save();
		res.status(201).json(newCourse);
	} catch (err) {
		res.status(400).json({ message: "Los request.", error: err });
	}
}

async function getAllCourses(req, res) {
	const courses = await Course.find();
	res.json(courses);
}

async function getCourseById(req, res) {
	const id = +req.params.id;
	try {
		const course = await Course.findById(id);
		if (!course)
			return res.status(404).json("Course sa tim id-jem ne postoji.");
		res.json(course);
	} catch (err) {
		res.status(400).json({ message: "Pogresan format id-ja.", error: err });
	}
}

async function updateCourse(req, res) {
	try {
		const course = await Course.findByIdAndUpdate(+req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!course)
			return res.status(404).send("Course sa tim id-jem ne postoji.");
		res.json(course);
	} catch {
		res.status(400).send("Pogresan format id-ja.");
	}
}

async function deleteCourse(req, res) {
	try {
		const deleted = await Course.findByIdAndDelete(+req.params.id);
		if (!deleted)
			return res.status(404).send("Course sa ovim id-jem ne postoji.");
	} catch (err) {
		res
			.status(400)
			.send({ message: "Los rikvest. Format id-ja pogresan.", error: err });
	}
}

module.exports = {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
};
