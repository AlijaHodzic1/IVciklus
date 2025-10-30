const express = require("express");
const router = express.Router();
const Students = require("../data/students");
const studentValidation = require("../middleware/studentValidation");
const logger = require("../middleware/logger");

router.use(logger);

router.get("/", (req, res) => {
	res.json(Students);
});

router.get("/:id", (req, res) => {
	const id = +req.params.id;
	const student = Students.find((s) => s.id === id);
	if (!student) return res.sendStatus(404);
	res.json(student);
});

router.post("/", studentValidation, (req, res) => {
	const { name, age, city, email } = req.body;
	const newStudent = { id: Students.length + 1, name, age, city, email };
	Students.push(newStudent);
	res.sendStatus(201);
});

router.put("/:id", studentValidation, (req, res) => {
	const id = +req.params.id;
	const index = Students.findIndex((s) => s.id === id);

	if (index === -1) return res.sendStatus(404);

	const { name, age, city, email } = req.body;
	Students[index] = { name, age, city, email };
});

router.patch("/:id", (req, res) => {
	const id = +req.params.id;
	const student = Students.find((s) => s.id == id);

	if (!student) return res.sendStatus(404);

	const { name, age, city, email } = req.body;

	if (name) student.name = name;
	if (age) student.age = age;
	if (city) student.city = city;
	if (email) student.email = email;
	res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
	const id = +req.params.id;
	Students = Students.filter((s) => s.id !== id);
	res.sendStatus(204);
});

module.exports = router;
