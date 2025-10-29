const studentValidation = (req, res, next) => {
	const { name, age, city, email } = req.body;

	if (!name || !age || !city || !email)
		return res.status(400).send("Los request. Moraju se sva polja popuniti.");

	if (age && +age < 12) return res.status(400).send("Premalo godina.");

	if (city && city.length < 5)
		return res.status(400).send("Prekratko ime grada.");

	if (!email.includes("@"))
		return res.status(400).send("Imejl mora sadrzati @");

	next();
};

module.exports = studentValidation;
