const express = require("express");
const router = express.Router();
const Courses = require("../data/course");
const studentValidation = require("../middleware/studentValidation");

router.get("/", (req, res) => {
	res.json(Courses);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const course = Courses.find((c) => c.id === id);
	if (!course) return res.sendStatus(404);
	res.json(course);
});

router.post("/", studentValidation, (req, res) => {
	const { title, description, duration, level } = req.body;
	const newCourse = {
		id: Courses.length + 1,
		title,
		description,
		duration,
		level,
	};
	Courses.push(newCourse);
	res.sendStatus(201);
});

router.put("/:id", studentValidation, (req, res) => {
	const id = +req.params.id;
	const index = Courses.findIndex((c) => c.id === id);

	if (index === -1) return res.sendStatus(404);

	const { title, description, duration, level } = req.body;
	Courses[index] = { title, description, duration, level };
});

router.patch("/:id", (req, res) => {
	const id = +req.params.id;
	const course = Courses.find((c) => c.id == id);

	if (!course) return res.sendStatus(404);

	const { title, description, duration, level } = req.body;

	if (title) course.title = title;
	if (description) course.description = description;
	if (duration) course.duration = duration;
	if (level) course.level = level;
	res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
	const id = +req.params.id;
	Courses = Courses.filter((c) => c.id !== id);
	res.sendStatus(204);
});

module.exports = router;
