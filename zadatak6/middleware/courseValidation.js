const courseValidation = (req, res, next) => {
	const { name, category, duration, level } = req.body;

	if (!name || !category || !duration || !level)
		return res.status(400).send("Los request. Moraju se sva polja popuniti.");

	if (name && name.length < 2)
		return res.status(400).send("Prekratko ime kursa.");

	if (duration && +duration < 28)
		return res.status(400).send("Premalo trajanje.");

	if (level && !["Beginner", "Intermediate", "Advanced"].includes(level))
		return res.status(400).send("Nepoznati nivo kursa.");

	next();
};

module.exports = courseValidation;
