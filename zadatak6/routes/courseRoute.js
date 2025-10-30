const express = require("express");
const router = express.Router();
const Courses = require("../data/course");
const courseValidation = require("../middleware/courseValidation");
const logger = require("../middleware/logger");

router.use(logger);

router.get("/", (req, res) => {
	res.json(Courses);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const course = Courses.find((c) => c.id === id);
	if (!course) return res.sendStatus(404);
	res.json(course);
});

router.post("/", courseValidation, (req, res) => {
	const { name, description, duration, level } = req.body;
	const newCourse = {
		id: Courses.length + 1,
		name,
		description,
		duration,
		level,
	};
	Courses.push(newCourse);
	res.sendStatus(201);
});

router.put("/:id", courseValidation, (req, res) => {
	const id = +req.params.id;
	const index = Courses.findIndex((c) => c.id === id);

	if (index === -1) return res.sendStatus(404);

	const { name, description, duration, level } = req.body;
	Courses[index] = { name, description, duration, level };
});

router.patch("/:id", (req, res) => {
	const id = +req.params.id;
	const course = Courses.find((c) => c.id == id);

	if (!course) return res.sendStatus(404);

	const { name, description, duration, level } = req.body;

	if (name) course.name = name;
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
